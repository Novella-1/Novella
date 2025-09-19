import React from 'react';
import { TypographyH1 } from '@/components/ui/custom/typography';
import { BackButton } from '../common/BackButton/BackButton';
import CartCard from '../common/CartCard';
import CartCheckout from '../common/CartCheckout';

const CartTemplate = () => {
  const cards = new Array(6).fill(0).map((_, i) => <CartCard key={i} />);

  return (
    <section className="flex flex-col items-center justify-center pt-6 md:pt-10">
      <div className="w-full max-w-[1200px] px-4">
        <BackButton />
        <TypographyH1 className="pb-6 text-2xl sm:text-3xl">Cart</TypographyH1>

        <div className="flex flex-col xl:flex-row xl:items-start gap-6">
          <div className="w-full xl:flex-1 min-h-0">
            <div
              className="
                overflow-y-auto pr-2 space-y-4
                max-h-[400px]        /* mobile: ~2.5 cards × 160px */
                sm:max-h-[320px]     /* tablet: ~2.5 cards × 128px */
                xl:max-h-[416px]     /* desktop: 3 cards (3×128px + 2×16px gaps) */
              "
            >
              {cards}
            </div>
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
