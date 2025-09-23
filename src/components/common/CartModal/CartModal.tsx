import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/ui/custom/typography';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import CartCard from '../Cart/CartCard';

// Приклад типу для товару
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartModalProps {
  cartItems: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

export default function CartModal({ cartItems }: CartModalProps) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cards = new Array(5).fill(0).map((_, i) => <CartCard key={i} />);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative"
        >
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cart </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ?
              'Your cart is empty. Start adding some products!'
            : `You have ${totalItems} items in your cart.`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ?
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <TypographyP>Add products to cart</TypographyP>
            </div>
          : <>
              <div className="w-full xl:flex-1 min-h-0 overflow-y-auto max-h-120">
                <div className=" rounded-lg p-4 shadow-sm h-full">
                  <div className="space-y-4">{cards}</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total:</span>
                  <span>₴{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#5A4632] text-white rounded-md font-bold hover:bg-[#4a3826] hover:cursor-pointer w-full transition"
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
