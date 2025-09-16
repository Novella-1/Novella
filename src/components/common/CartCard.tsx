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
    <Card className="box-content flex flex-col sm:flex-row sm:items-center justify-between w-full sm:max-w-[752px] xl:h-[120px] p-6 gap-4">
      {/* Left side       */}
      <div className="flex items-center gap-4 min-w-0">
        <X
          size={16}
          className="shrink-0"
        />
        <Image
          src={'/cart-card-book-cover.png'}
          alt="cart card-book-cover"
          width={80}
          height={80}
          className="rounded-md shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <TypographyH5 className="truncate">Behind the Net</TypographyH5>

          <TypographyP className="truncate">Stephanie Archer</TypographyP>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <Minus size={16} />
          <p>1</p>
          <Plus size={16} />
        </div>

        <div>
          <TypographyH3>₴541</TypographyH3>
        </div>
      </div>
    </Card>
  );
};

export default CartCard;
