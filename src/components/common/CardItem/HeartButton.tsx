'use client';

import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  isFav: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export function HeartButton({
  isFav,
  onClick,
  className,
  ...props
}: HeartButtonProps) {
  const [animate, setAnimate] = useState(false);
  const [optimisticFav, setOptimisticFav] = useState(isFav);

  if (optimisticFav !== isFav) {
    setOptimisticFav(isFav);
  }

  const handleClick = () => {
    setAnimate(true);
    setOptimisticFav((prev) => !prev);
    onClick();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(
        'p-0 rounded-full bg-transparent flex items-center justify-center cursor-pointer hover:bg-transparent outline-none transition-all duration-200',
        className,
      )}
      {...props}
    >
      <div className="relative flex items-center justify-center w-10 h-10">
        <motion.div
          animate={
            animate ?
              {
                scale: [1, 1.2, 1],
              }
            : {}
          }
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          onAnimationComplete={() => setAnimate(false)}
        >
          <HeartIcon
            className={cn(
              'w-8 h-8 transition-all duration-300',
              isFav ?
                'fill-red-500 text-red-500'
              : 'fill-none text-gray-400 hover:text-red-300',
            )}
          />
        </motion.div>
      </div>
    </Button>
  );
}
