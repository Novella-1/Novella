import { useState } from 'react';
import { showToast } from '@/components/common/ShowToast';
import { Button } from '@/components/ui/button';
import { TypographyB } from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';

export function AddToCart({ name }: { name: string }) {
  const [inCart, setInCart] = useState(false);

  const handleClick = () => {
    if (!inCart) {
      showToast('addToCart', name);
      setInCart(true);
    } else {
      showToast('removeFromCart', name);
      setInCart(false);
    }
  };

  return (
    <Button
      className={cn(
        'flex-1 h-10 cursor-pointer bg-custom-button transition-shadow duration-200',
        {
          'bg-custom-primary-bg border border-custom-border text-custom-button':
            inCart,
        },
      )}
      onClick={handleClick}
    >
      <TypographyB
        className={cn({
          'text-custom-button': inCart,
        })}
      >
        {inCart ? 'Remove from cart' : 'Add to cart'}
      </TypographyB>
    </Button>
  );
}
