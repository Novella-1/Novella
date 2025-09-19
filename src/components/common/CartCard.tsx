import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { Card } from '../ui/card';

const CartCard = () => {
  return (
    <Card
      className="
        flex flex-col               /* мобильная: 2 ряда */
        sm:flex-row sm:items-center /* планшет+ и десктоп: 1 ряд */
        justify-between
        w-full
        p-4 sm:p-6
        gap-4
        border border-gray-200 rounded-lg
        shadow-sm
        hover:shadow-md transition-shadow duration-200
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          aria-label="Remove item"
          className="shrink-0 text-gray-400 hover:text-gray-600 p-5"
        >
          <X size={16} />
        </button>

        <Image
          src={'/cart-card-book-cover.png'}
          alt="Behind the Net — Stephanie Archer"
          width={80}
          height={80}
          className="rounded-md shrink-0 object-cover"
        />

        <div className="flex flex-col min-w-0 p-5">
          <TypographyH5 className="truncate text-base sm:text-lg">
            Behind the Net
          </TypographyH5>
          <TypographyP className="truncate text-sm sm:text-base text-muted-foreground">
            Stephanie Archer
          </TypographyP>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 bg-white hover:bg-gray-50 transition-colors">
          <button aria-label="Decrease">
            <Minus
              size={16}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>
          <p className="w-6 text-center text-base">1</p>
          <button aria-label="Increase">
            <Plus
              size={16}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>
        </div>
        <TypographyH3 className="whitespace-nowrap text-base sm:text-lg font-bold p-5">
          ₴541
        </TypographyH3>
      </div>
    </Card>
  );
};

export default CartCard;
