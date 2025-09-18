import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { TypographyH1 } from '@/components/ui/custom/typography';
import CartCard from '../common/Cart/CartCard';
import CartCheckout from '../common/Cart/CartCheckout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const CartTemplate = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-[1200px]">
        <Button variant={'link'}>
          <ChevronLeft />
          <span>Back</span>
        </Button>
        <TypographyH1 className="pb-[32px]">Cart</TypographyH1>
        <div className="flex flex-col  md:flex-row md:items-start gap-4">
          <Card className="flex flex-col gap-4 max-h-[390px] overflow-y-auto p-5 md:flex-1 bg-custom-header-footer">
            <CartCard />
            <CartCard />
            <CartCard />
            <CartCard />
          </Card>

          <div className="md:w-[320px]">
            <CartCheckout />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartTemplate;
