'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
import { addToCart, fetchCart, removeFromCart } from '@/services/fetchCart';
import { CartItem } from '@/types/CartItemType';

interface CartModalProps {
  userId?: string;
}

export default function CartModal({ userId }: CartModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['CART', userId],
    queryFn: async () => {
      // if (!userId) {
      //   const localCart = getLocalCart();
      //   return {
      //     data: localCart,
      //     totalCount: localCart.length,
      //     totalPrice: localCart.reduce(
      //       (sum, item) => sum + (item.book.priceRegular || 0),
      //       0,
      //     ),
      //   };
      // }

      const result = await fetchCart(userId!);
      return result;
    },
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
    if (isOpen && userId) {
      refetch();
    }
  };

  const handleAddQuantity = (bookId: string) => {
    addMutation.mutate({ bookId, quantity: 1 });
  };

  const handleRemoveQuantity = (bookId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      addMutation.mutate({ bookId, quantity: -1 });
    } else {
      removeMutation.mutate(bookId);
    }
  };

  const handleRemoveItem = (bookId: string) => {
    removeMutation.mutate(bookId);
  };

  if (error) {
    throw new Error('Cart loading error');
  }

  const cartItems = cartData?.data || [];
  const totalCount = cartData?.totalCount || 0;
  const totalPrice = cartData?.totalPrice || 0;

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
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {!userId ?
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <TypographyP>Please sign in to view your cart</TypographyP>
            </div>
          : isLoading || isFetching ?
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
            </div>
          : <>
              <div className="w-full flex-1 min-h-0 overflow-y-auto max-h-96">
                <div className="space-y-4">
                  {cartItems.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <TypographyP className="font-medium">
                          {item.book.name}
                        </TypographyP>
                        <TypographyP className="text-sm text-gray-600">
                          ₴
                          {(
                            item.book.priceDiscount || item.book.priceRegular
                          ).toFixed(2)}
                        </TypographyP>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleRemoveQuantity(item.book.id, item.quantity)
                          }
                          disabled={removeMutation.isPending}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleAddQuantity(item.book.id, item.quantity)
                          }
                          disabled={addMutation.isPending}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveItem(item.book.id)}
                          disabled={removeMutation.isPending}
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
                <button
                  type="button"
                  className="px-4 py-3 bg-[#5A4632] text-white rounded-md font-bold hover:bg-[#4a3826] hover:cursor-pointer w-full transition"
                >
                  Make an order 🔖
                </button>
              </div>
            </>
          }
        </div>
      </SheetContent>
    </Sheet>
  );
}

// {
//   cartItems.map((item) => (
//     <div
//       key={item.id}
//       className="flex items-center justify-between p-3 border rounded-lg"
//     >
//       <div className="flex-1">
//         <TypographyP className="font-medium">{item.name}</TypographyP>
//         <TypographyP className="text-sm text-gray-600">
//           ₴{item.price?.toFixed(2)}
//         </TypographyP>
//       </div>
//       {/* Здесь можно добавить управление количеством */}
//     </div>
//   ));
// }
