'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TypographyB } from '@/components/ui/custom/typography';
import {
  addToLocalCart,
  removeFromLocalCart,
  isInLocalCart,
  getLocalCartItem,
} from '@/lib/localStorage';
import { cn } from '@/lib/utils';
import { addToCart, fetchCart, removeFromCart } from '@/services/fetchCart';
import { BookWithDetails } from '@/types/BookType';
import { CartItem } from '@/types/CartItemType';
import { showToast } from '../ShowToast';

interface AddToCartProps {
  className?: string;
  name?: string;
  book: BookWithDetails;
}

export function AddToCart({ name, book }: AddToCartProps) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [localInCart, setLocalInCart] = useState(false);
  const [pending, setPending] = useState(false);

  const { data: cartResponse } = useQuery({
    queryKey: ['CART', session?.user?.id],
    queryFn: () => {
      if (!session?.user?.id) return null;
      return fetchCart(session.user.id);
    },
    enabled: status === 'authenticated' && !!session?.user?.id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const cartItems: CartItem[] = cartResponse?.data ?? [];

  useEffect(() => {
    const handleCartButtonsUpdated = () => {
      if (status === 'unauthenticated') {
        const localCartItem = getLocalCartItem(book.id);
        setLocalInCart(!!localCartItem);
      }
      queryClient.invalidateQueries({ queryKey: ['CART', session?.user?.id] });
    };

    window.addEventListener('cartButtonsUpdated', handleCartButtonsUpdated);
    return () =>
      window.removeEventListener(
        'cartButtonsUpdated',
        handleCartButtonsUpdated,
      );
  }, [book.id, status, session?.user?.id, queryClient]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setLocalInCart(isInLocalCart(book.id));
    }
  }, [book.id, status]);

  const isInCart =
    status === 'authenticated' ?
      cartItems.some((item) => item.book.id === book.id)
    : status === 'unauthenticated' ? localInCart
    : false;

  const notifyCountChange = () => {
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    if (session?.user?.id) {
      queryClient.invalidateQueries({
        queryKey: ['CART', session.user.id],
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['LOCAL_CART_COUNT'] });
    }
  };

  const handleAddToCart = async () => {
    if (pending || status === 'loading') return;

    setPending(true);

    const newCartState = !isInCart;

    try {
      if (status === 'authenticated' && session?.user?.id) {
        const authKey = ['CART', session.user.id];

        queryClient.setQueryData(
          authKey,
          (
            old:
              | { data: CartItem[]; totalCount: number; totalPrice: number }
              | undefined,
          ) => {
            const oldData = old?.data ?? [];
            let newData: CartItem[];

            if (newCartState) {
              const existingItem = oldData.find(
                (item) => item.book.id === book.id,
              );
              if (existingItem) {
                newData = oldData.map((item) =>
                  item.book.id === book.id ?
                    { ...item, quantity: item.quantity + 1 }
                  : item,
                );
              } else {
                newData = [
                  ...oldData,
                  {
                    id: `${book.id}-temp`,
                    quantity: 1,
                    book,
                  },
                ];
              }
            } else {
              newData = oldData.filter((item) => item.book.id !== book.id);
            }

            const totalCount = newData.reduce(
              (sum, item) => sum + item.quantity,
              0,
            );
            const totalPrice = newData.reduce((sum, item) => {
              const price = item.book.priceDiscount || item.book.priceRegular;
              return sum + price * item.quantity;
            }, 0);

            return {
              data: newData,
              totalCount,
              totalPrice,
            };
          },
        );

        if (newCartState) {
          await addToCart(session.user.id, book.id, 1);
        } else {
          await removeFromCart(session.user.id, book.id);
        }

        await queryClient.invalidateQueries({ queryKey: authKey });
      } else if (status === 'unauthenticated') {
        if (newCartState) {
          addToLocalCart(book, 1);
        } else {
          removeFromLocalCart(book.id);
        }
        setLocalInCart(newCartState);
      }

      showToast(
        newCartState ? 'addToCart' : 'removeFromCart',
        name ?? book.name,
      );

      notifyCountChange();
    } catch (err) {
      console.error('Cart operation error:', err);

      if (status === 'authenticated' && session?.user?.id) {
        queryClient.invalidateQueries({ queryKey: ['CART', session.user.id] });
      } else if (status === 'unauthenticated') {
        setLocalInCart(!newCartState);
        if (newCartState) {
          removeFromLocalCart(book.id);
        } else {
          addToLocalCart(book);
        }
      }
    } finally {
      setPending(false);
    }
  };

  const displayText = isInCart ? 'Remove from cart' : 'Add to cart';

  return (
    <Button
      className={cn(
        'flex-1 h-10 cursor-pointer bg-custom-button transition-shadow duration-200',
        {
          'bg-custom-header-footer border border-custom-border': isInCart,
        },
      )}
      onClick={handleAddToCart}
    >
      <TypographyB
        className={cn({
          ' text-custom-primary-text': isInCart,
        })}
      >
        {pending ? 'Processing...' : displayText}
      </TypographyB>
    </Button>
  );
}
