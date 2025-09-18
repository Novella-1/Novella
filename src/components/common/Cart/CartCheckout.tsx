import React from 'react';
import { TypographyH2, TypographyP } from '@/components/ui/custom/typography';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

const CartCheckout = () => {
  return (
    <Card className="box-content flex  flex-col items-center justify-center w-[368px] h-[188px]">
      <TypographyH2>₴1,623</TypographyH2>

      <TypographyP>Total for 3 items</TypographyP>
      <Button
        variant="default"
        className="w-[320px] h-[48px]"
      >
        Checkout
      </Button>
    </Card>
  );
};

export default CartCheckout;
