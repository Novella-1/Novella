import React from 'react';
import { TypographyH1 } from '@/components/ui/custom/typography';
import { BackButton } from '../common/BackButton/BackButton';
import CartCard from '../common/Cart/CartCard';
import CartCheckout from '../common/Cart/CartCheckout';

const CartTemplate = () => {
  const cards = new Array(6).fill(0).map((_, i) => <CartCard key={i} />);

  return (
    <section className="flex flex-col items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-[1200px] px-4 pb-5">
        {/* Отступ сверху для BackButton */}
        <div className="pt-4">
          <BackButton />
        </div>

        <TypographyH1 className="pb-6 text-2xl sm:text-3xl">Cart</TypographyH1>

        <div className="flex flex-col xl:flex-row xl:items-start gap-6">
          {/* Убрали контейнер с фоном */}
          <div className="w-full xl:flex-1 min-h-0">
            <div className="space-y-4">{cards}</div>
          </div>

          <div className="w-full xl:w-[320px] flex-shrink-0">
            <div className="sticky top-6">
              <CartCheckout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartTemplate;
