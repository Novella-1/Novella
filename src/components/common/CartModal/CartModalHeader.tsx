import React from 'react';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const CartModalHeader = ({
  totalCount,
  userId,
}: {
  totalCount: number;
  userId?: string;
}) => {
  return (
    <SheetHeader>
      <SheetTitle className="text-custom-primary-text text-2xl text-bold">
        Cart
      </SheetTitle>
      <SheetDescription>
        {totalCount === 0 ?
          'Your cart is empty. Start adding some products!'
        : `You have ${totalCount} items in your cart.`}
        {!userId && ' (Local storage)'}
      </SheetDescription>
    </SheetHeader>
  );
};

export default CartModalHeader;
