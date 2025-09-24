import React, { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { CartIcon } from '@/components/ui/custom/icons';

const CartHeaderIcon = forwardRef<
  HTMLButtonElement,
  { totalCount: number; isLoading: boolean }
>(({ totalCount, isLoading, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="relative flex items-center justify-center text-custom-icons hover:text-custom-icons-hover transition-colors cursor-pointer"
      disabled={isLoading}
    >
      <CartIcon className="w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6" />
      {totalCount > 0 && (
        <Badge
          className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-0.5 font-mono tabular-nums flex items-center justify-center text-xs"
          variant="destructive"
        >
          {totalCount > 9 ? '9+' : totalCount}
        </Badge>
      )}
    </button>
  );
});

CartHeaderIcon.displayName = 'CartHeaderIcon';

export default CartHeaderIcon;
