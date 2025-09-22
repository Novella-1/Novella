'use client';

import clsx from 'clsx';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface IconNavProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

const IconNav: FC<IconNavProps> = ({ variant = 'desktop', className }) => {
  const isMobile = variant === 'mobile';

  const containerClasses =
    isMobile ?
      'flex justify-around items-center gap-4 py-3'
    : 'flex items-center gap-8';

  const size = 22;

  return (
    <div className={clsx(containerClasses, className)}>
      <Link
        href="/favourites"
        aria-label="Favourites"
        className="flex items-center justify-center text-custom-icons"
      >
        <Heart
          size={size}
          strokeWidth={1.5}
        />
      </Link>
      <Link
        href="/cart"
        aria-label="Cart"
        className="flex items-center justify-center text-custom-icons"
      >
        <ShoppingBag
          size={size}
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
};

export default IconNav;
