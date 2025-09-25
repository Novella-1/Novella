import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { Card } from '../../ui/card';

const CartCard = () => {
  return (
    <Card
      className="
        flex flex-col
        md:flex-row md:items-center
        justify-between
        w-full
        px-3 py-3 md:p-6
        gap-4
        border border-gray-200 rounded-lg
        shadow-sm
        hover:shadow-md transition-shadow duration-200
        bg-custom-separator
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          aria-label="Remove item"
          className="shrink-0 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>

        <Image
          src={'/cart-card-book-cover.png'}
          alt="Behind the Net — Stephanie Archer"
          width={80}
          height={80}
          className="rounded-md shrink-0 object-cover"
        />

        <div className="flex flex-col min-w-0">
          <TypographyH5 className="truncate text-base md:text-lg font-semibold">
            Behind the Net
          </TypographyH5>
          <TypographyP className="truncate text-sm md:text-base text-muted-foreground">
            Stephanie Archer
          </TypographyP>
        </div>
      </div>

      <div
        className="
          flex w-full justify-between items-center
          md:w-auto md:justify-start md:gap-4
        "
      >
        <div className="flex items-center gap-3 rounded-md px-3 py-1.5 bg-transparent border-none">
          <button
            aria-label="Decrease"
            className="p-1.5 rounded hover:bg-gray-100 transition"
          >
            <Minus
              size={18}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>
          <p className="w-6 text-center text-base font-medium">1</p>
          <button
            aria-label="Increase"
            className="p-1.5 rounded hover:bg-gray-100 transition"
          >
            <Plus
              size={18}
              className="text-gray-600 hover:text-gray-800"
            />
          </button>
        </div>

        <TypographyH3 className="whitespace-nowrap text-lg font-bold pr-2">
          ₴541
        </TypographyH3>
      </div>
    </Card>
  );
};

export default CartCard;
