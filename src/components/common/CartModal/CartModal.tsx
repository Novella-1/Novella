'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, ShoppingCart, Trash2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/ui/custom/icons';
import { TypographyP } from '@/components/ui/custom/typography';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  getLocalCart,
  updateLocalCartQuantity,
  removeFromLocalCart,
  getLocalCartCount,
  getLocalCartTotalPrice,
} from '@/lib/localStorage';
import { addToCart, fetchCart, removeFromCart } from '@/services/fetchCart';
import { CartItem } from '@/types/CartItemType';

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
    }
  };

  const cartItems = userId ? serverCartData?.data || [] : localCartItems;
  const totalCount =
    userId ? serverCartData?.totalCount || 0 : getLocalCartCount();
  const totalPrice =
    userId ? serverCartData?.totalPrice || 0 : getLocalCartTotalPrice();

  const isPending = addMutation.isPending || removeMutation.isPending;
  const isLoadingData = userId && (isLoading || isFetching);

  return (
    <Sheet
      open={open}
      onOpenChange={handleOpenChange}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative text-custom-icons border-2 hover:cursor-pointer"
          disabled={isLoading}
        >
          <CartIcon
            strokeWidth={2.5}
            className="w-4 h-4 xl:w-6 xl:h-6"
          />
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalCount > 9 ? '9+' : totalCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-custom-primary-bg">
        <SheetHeader>
          <SheetTitle className="text-custom-primary-text">Cart</SheetTitle>
          <SheetDescription>
            {totalCount === 0 ?
              'Your cart is empty. Start adding some products!'
            : `You have ${totalCount} items in your cart.`}
            {!userId && ' (Local storage)'}
          </SheetDescription>
        </SheetHeader>

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
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <TypographyP className="text-blue-800 text-sm flex items-center justify-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <Link
                      href="/auth/signin"
                      className="underline font-medium"
                    >
                      Sign in
                    </Link>
                    to save your cart permanently
                  </TypographyP>
                </div>
              )}
            </div>
          : <>
              <div className="w-full flex-1 min-h-0 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {cartItems.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <TypographyP className="font-medium truncate">
                          {item.book.name}
                        </TypographyP>
                        <TypographyP className="text-sm text-gray-600">
                          ₴
                          {(
                            item.book.priceDiscount || item.book.priceRegular
                          ).toFixed(2)}{' '}
                          each
                        </TypographyP>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleRemoveQuantity(item.book.id, item.quantity)
                          }
                          disabled={isPending}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddQuantity(item.book.id)}
                          disabled={isPending}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveItem(item.book.id)}
                          disabled={isPending}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center font-semibold text-lg text-custom-primary-text">
                  <span>Total:</span>
                  <span>₴{totalPrice.toFixed(2)}</span>
                </div>

                {!userId && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <TypographyP className="text-yellow-800 text-sm flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      <Link
                        href="/auth/signin"
                        className="underline font-medium"
                      >
                        Sign in
                      </Link>
                      to save your cart and access it from any device
                    </TypographyP>
                  </div>
                )}

                <button
                  type="button"
                  className="px-4 py-3 bg-[#5A4632] text-white rounded-md font-bold hover:bg-[#4a3826] hover:cursor-pointer w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cartItems.length === 0 || isPending}
                >
                  {isPending ? 'Processing...' : 'Make an order 🔖'}
                </button>
              </div>
            </>
          }
        </div>
      </SheetContent>
    </Sheet>
  );
}
