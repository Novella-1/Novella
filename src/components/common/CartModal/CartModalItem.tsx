import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/ui/custom/typography';
import { CartItem } from '@/types/CartItemType';

type Props = {
  item: CartItem;
  handleRemoveQuantity: (bookId: string, currentQuantity: number) => void;
  handleAddQuantity: (bookId: string) => void;
  handleRemoveItem: (bookId: string) => void;
  isPending: boolean;
};

const CartModalItem = ({
  item,
  handleRemoveQuantity,
  isPending,
  handleAddQuantity,
  handleRemoveItem,
}: Props) => {
  return (
    <div
      key={item.id}
      className="flex items-center justify-between p-3 border rounded-lg bg-white"
    >
      <Image
        width={80}
        height={80}
        src={`/books/${item.book.images[0]}`}
        alt="Cart item img"
      />
      <div className="flex-1 min-w-0 mr-4">
        <TypographyP className="font-medium truncate">
          {item.book.name}
        </TypographyP>
        <TypographyP className="text-sm text-gray-600">
          ₴{(item.book.priceDiscount || item.book.priceRegular).toFixed(2)} each
        </TypographyP>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleRemoveQuantity(item.book.id, item.quantity)}
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
  );
};

export default CartModalItem;
