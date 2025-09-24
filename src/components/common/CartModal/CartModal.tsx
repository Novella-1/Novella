'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';

import { useState, useEffect } from 'react';

import { toast } from 'sonner';
import { TypographyP } from '@/components/ui/custom/typography';
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  getLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  getLocalCartCount,
  getLocalCartTotalPrice,
} from '@/lib/localStorage';
import {
  addToCart,
  createOrder,
  fetchCart,
  removeFromCart,
} from '@/services/fetchCart';
import { CartItem } from '@/types/CartItemType';
import CartHeaderIcon from '../Cart/CartHeaderIcon';
import CartModalCheckoutButton from './CartModalCheckoutButton';
import CartModalHeader from './CartModalHeader';
import CartModalItem from './CartModalItem';
import {
  SignInPropositionWhen0Items,
  SignInPropositionWhenItemsExists,
} from './SignInProposition';

interface CartModalProps {
  userId?: string;
}

export default function CartModal({ userId }: CartModalProps) {
  const [open, setOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) {
      setLocalCartItems(getLocalCart());
    }
  }, [userId, open]);

  useEffect(() => {
    const handleCartUpdated = () => {
      if (!userId) {
        setLocalCartItems(getLocalCart());
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => window.removeEventListener('cartUpdated', handleCartUpdated);
  }, [userId]);

  const {
    data: serverCartData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['CART', userId],
    queryFn: () => fetchCart(userId!),
    enabled: !!userId,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const addMutation = useMutation({
    mutationFn: ({ bookId, quantity }: { bookId: string; quantity: number }) =>
      addToCart(userId!, bookId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CART', userId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (bookId: string) => removeFromCart(userId!, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CART', userId] });
    },
  });

  const orderMutation = useMutation({
    mutationFn: async () => {
      let items: { bookId: string; quantity: number; price: number }[] = [];

      if (userId) {
        if (!serverCartData?.data || serverCartData.data.length === 0) {
          throw new Error('Cart is empty');
        }

        items = serverCartData.data.map((item: CartItem) => ({
          bookId: item.book.id,
          quantity: item.quantity,
          price: item.book.priceDiscount || item.book.priceRegular,
        }));
      } else {
        const localCart = getLocalCart();
        if (!localCart || localCart.length === 0) {
          throw new Error('Cart is empty');
        }

        items = localCart.map((item: CartItem) => ({
          bookId: item.book.id,
          quantity: item.quantity,
          price: item.book.priceDiscount || item.book.priceRegular,
        }));
      }
      const orderData = {
        userId,
        items: items,
      };

      console.log(orderData);

      return await createOrder(orderData);
    },
    onSuccess: (order) => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['CART', userId] });
      } else {
        localStorage.removeItem('cart');
        window.dispatchEvent(new CustomEvent('cartButtonsUpdated'));
      }
      handleOpenChange(false);
      toast.success('Vitayu');
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      if (userId) {
        refetch();
      } else {
        setLocalCartItems(getLocalCart());
      }
    }
  };

  const handleLocalAddQuantity = (bookId: string) => {
    updateLocalCartQuantity(bookId, 1);
    setLocalCartItems(getLocalCart());
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleLocalRemoveQuantity = (
    bookId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity > 1) {
      updateLocalCartQuantity(bookId, -1);
    } else {
      removeFromLocalCart(bookId);
      window.dispatchEvent(new CustomEvent('cartButtonsUpdated'));
    }
    setLocalCartItems(getLocalCart());
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleLocalRemoveItem = (bookId: string) => {
    removeFromLocalCart(bookId);
    setLocalCartItems(getLocalCart());
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleServerAddQuantity = (bookId: string) => {
    addMutation.mutate({ bookId, quantity: 1 });
  };

  const handleServerRemoveQuantity = (
    bookId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity > 1) {
      addMutation.mutate({ bookId, quantity: -1 });
    } else {
      removeMutation.mutate(bookId);
    }
  };

  const handleServerRemoveItem = (bookId: string) => {
    removeMutation.mutate(bookId);
  };

  const handleAddQuantity = (bookId: string) => {
    if (userId) {
      handleServerAddQuantity(bookId);
    } else {
      handleLocalAddQuantity(bookId);
    }
  };

  const handleRemoveQuantity = (bookId: string, currentQuantity: number) => {
    if (userId) {
      handleServerRemoveQuantity(bookId, currentQuantity);
    } else {
      handleLocalRemoveQuantity(bookId, currentQuantity);
    }
  };

  const handleRemoveItem = (bookId: string) => {
    if (userId) {
      handleServerRemoveItem(bookId);
    } else {
      handleLocalRemoveItem(bookId);
      window.dispatchEvent(new CustomEvent('cartButtonsUpdated'));
    }
  };

  const handleCheckout = async () => {
    orderMutation.mutate();
  };

  const cartItems = userId ? serverCartData?.data || [] : localCartItems;
  const totalCount =
    userId ? serverCartData?.totalCount || 0 : getLocalCartCount();
  const totalPrice =
    userId ? serverCartData?.totalPrice || 0 : getLocalCartTotalPrice();

  const isPending =
    addMutation.isPending ||
    removeMutation.isPending ||
    orderMutation.isPending;

  const isLoadingData = userId && (isLoading || isFetching);

  if (error) {
    throw new Error('An error occured');
  }

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SheetTrigger asChild>
        <CartHeaderIcon
          isLoading={isLoading}
          totalCount={totalCount}
        />
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-custom-primary-bg">
        <CartModalHeader
          totalCount={totalCount}
          userId={userId}
        />

        <div className="mt-6 space-y-4">
          {isLoadingData ?
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <TypographyP>Loading cart...</TypographyP>
            </div>
          : cartItems.length === 0 ?
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <TypographyP>Your cart is empty</TypographyP>
              <TypographyP className="text-sm mt-2">
                Add some products to get started!
              </TypographyP>
              {!userId && (
                <SignInPropositionWhen0Items
                  handleOpenChange={handleOpenChange}
                />
              )}
            </div>
          : <>
              <div className="w-full flex-1 min-h-0 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {cartItems.map((item: CartItem) => (
                    <CartModalItem
                      key={item.id}
                      item={item}
                      handleRemoveQuantity={handleRemoveQuantity}
                      handleAddQuantity={handleAddQuantity}
                      handleRemoveItem={handleRemoveItem}
                      isPending={isPending}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center font-semibold text-lg text-custom-primary-text">
                  <span>Total:</span>
                  <span>₴{totalPrice.toFixed(2)}</span>
                </div>

                {!userId && (
                  <SignInPropositionWhenItemsExists
                    handleOpenChange={handleOpenChange}
                  />
                )}

                <CartModalCheckoutButton
                  itemsLength={cartItems.length}
                  isPending={isPending}
                  handleCheckout={handleCheckout}
                />
              </div>
            </>
          }
        </div>
      </SheetContent>
      <SheetOverlay />
    </Sheet>
  );
}
