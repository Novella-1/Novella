// import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/ui/custom/icons';
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
      className="flex items-center justify-between p-3 border rounded-lg bg-custom-header-footer"
    >
      <Image
        width={80}
        height={80}
        src={`/books/${item.book.images[0]}`}
        alt="Cart item img"
        className="rounded-md mr-4 flex-shrink-0 object-cover h-20 w-16"
      />
      <div className="flex-1 min-w-0 mr-4">
        <TypographyP className="font-medium truncate text-custom-primary-text">
          {item.book.name}
        </TypographyP>
        <TypographyP className="text-sm text-custom-icons">
          ${(item.book.priceDiscount || item.book.priceRegular).toFixed(2)} each
        </TypographyP>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleRemoveQuantity(item.book.id, item.quantity)}
          disabled={isPending}
          className="h-8 w-8 p-0 cursor-pointer bg-custom-primary-bg hover:bg-custom-primary-bg/50"
        >
          <MinusIcon className="h-3 w-3 text-custom-primary-text" />
        </Button>

        <span className="w-8 text-center font-medium text-sm text-custom-primary-text">
          {item.quantity}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAddQuantity(item.book.id)}
          disabled={isPending}
          className="h-8 w-8 p-0 cursor-pointer bg-custom-primary-bg hover:bg-custom-primary-bg/50"
        >
          <PlusIcon className="h-3 w-3 text-custom-primary-text" />
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleRemoveItem(item.book.id)}
          disabled={isPending}
          className="h-8 w-8 p-0 cursor-pointer "
        >
          <TrashIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default CartModalItem;
