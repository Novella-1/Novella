'use client';

import lottie, { AnimationItem } from 'lottie-web';
import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import heartAnimation from '@/../public/lotties/heartAnimation.json';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddToFavoriteProps {
  className?: string;
}

export function AddToFavorite({ className, ...props }: AddToFavoriteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !showAnimation) return;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: heartAnimation,
    });

    animRef.current.goToAndStop(0, true);

    return () => {
      animRef.current?.destroy();
    };
  }, [showAnimation]);

  const handleClick = () => {
    if (isAnimating) return;

    if (!isFav) {
      setIsAnimating(true);
      setShowAnimation(true);

      setTimeout(() => {
        if (animRef.current) {
          const totalFrames = animRef.current.totalFrames;
          const redHeartFrame = Math.floor(totalFrames * 0.6);

          animRef.current.playSegments([0, redHeartFrame], true);

          const handleComplete = () => {
            setIsFav(true);
            setIsAnimating(false);
            setShowAnimation(false);
            animRef.current?.removeEventListener('complete', handleComplete);
          };

          animRef.current.addEventListener('complete', handleComplete);
        }
      }, 50);
    } else {
      setIsFav(false);
      setShowAnimation(true);
    }
  };

  const router = useRouter();

  const onClickHandler = () => {
    // router.push('/login');
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClickHandler();
        }
      }}
      className={cn(
        'flex items-center justify-center rounded-[8px] border border-custom-border w-10 h-10 hover:bg-custom-primary-bg cursor-pointer',
        className,
      )}
      {...props}
    >
      <Button
        onClick={handleClick}
        className="p-0 rounded-full bg-transparent hover:bg-transparent flex items-center justify-center cursor-pointer hover:border-custom-primary-bg"
        variant="ghost"
        size="icon"
      >
        {showAnimation ?
          <div
            ref={containerRef}
            className="w-10 h-10"
          />
        : <HeartIcon className="text-custom-favourites-icon fill-custom-favourites-icon" />
        }
      </Button>
    </div>
  );
}
