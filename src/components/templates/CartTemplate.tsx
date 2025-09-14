import React from 'react';
import CardCart from '../common/CardCart';
import { TypographyH1 } from '../ui/typography';

const CartTemplate = () => {
  return (
    <div>
      <TypographyH1>Cart</TypographyH1>
      <CardCart />
    </div>
  );
};

export default CartTemplate;
