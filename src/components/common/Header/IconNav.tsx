'use client';

import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  mobileFooter?: boolean;
  className?: string;
}

const IconNav: FC<Props> = ({ mobileFooter = false, className }) => {
  const container =
    mobileFooter ?
      'flex justify-around items-center gap-4 py-3'
    : 'flex items-center gap-8';
  const iconSize = 22;

  return (
    <div className={cn(container, className)}>
      <Link
        href="/favourites"
        aria-label="Favourites"
        className="flex items-center justify-center text-custom-icons"
      >
        <Heart
          size={iconSize}
          strokeWidth={1.5}
        />
      </Link>

      <Link
        href="/cart"
        aria-label="Cart"
        className="flex items-center justify-center text-custom-icons"
      >
        <ShoppingBag
          size={iconSize}
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
};

export default IconNav;
