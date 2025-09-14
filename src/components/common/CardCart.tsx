import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Card } from '../ui/card';
import { TypographyH3, TypographyH5, TypographyP } from '../ui/typography';

const CardCart = () => {
  return (
    <Card className="box-content flex items-center justify-between w-[752px] h-[128px]">
      <div className="flex items-center gap-4">
        <X size={16} />
        <Image
          src={'/cart-card-book-cover.png'}
          alt="cart card-book-cover"
          width={80}
          height={80}
          // className=""
        />
        <div>
          <TypographyH5>Behind the Net</TypographyH5>

          <TypographyP>Stephanie Archer</TypographyP>
        </div>

        <div className="flex ">
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

export default CardCart;

// Width
// 52.99px

// Height
// 80px

// Left
// 13.5px

// Flow
// Horizontal

// Width
// Fill (752px)

// Height
// Hug (128px)

// Radius
// 16px

// Border
// 1px

// Padding
// 24px

// Gap
// 24px
