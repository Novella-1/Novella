import { ChevronLeft } from 'lucide-react';
import React from 'react';
import CartCard from '../common/CartCard';
import CartCheckout from '../common/CartCheckout';
import { Button } from '../ui/button';
import { TypographyH1 } from '../ui/typography';

const CartTemplate = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-[1200px]">
        <Button variant={'link'}>
          <ChevronLeft />
          <span>Back</span>
        </Button>
        <TypographyH1 className="pb-[32px]">Cart</TypographyH1>
        <div className="flex flex-col  md:flex-row md:items-start gap-4 ">
          <div className="flex flex-col gap-4 md:flex-1">
            <CartCard />
            <CartCard />
          </div>

          <div className="md:w-[320px]">
            <CartCheckout />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartTemplate;
