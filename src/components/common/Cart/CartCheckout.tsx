import React from 'react';
import { TypographyH2, TypographyP } from '@/components/ui/custom/typography';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const CartCheckout = () => {
  return (
    <Card
      className="
        flex flex-col items-center justify-center
        w-full max-w-full p-6 gap-4
        border border-gray-200 rounded-lg
        shadow-sm mb-5
      "
    >
      <TypographyH2 className="text-2xl sm:text-3xl">₴1,623</TypographyH2>
      <TypographyP className="text-sm sm:text-base">
        Total for 3 items
      </TypographyP>
      <Button
        variant="default"
        className="w-full max-w-[320px] h-[48px] bg-black text-white"
      >
        Checkout
      </Button>
    </Card>
  );
};

export default CartCheckout;
