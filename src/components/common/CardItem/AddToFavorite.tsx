'use client';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@/components/ui/custom/icons';
import { cn } from '@/lib/utils';

interface AddToFavoriteProps {
  className?: string;
}

export function AddToFavorite({ className, ...props }: AddToFavoriteProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push('/login');
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
        'flex w-10 h-10 p-3 items-center justify-center rounded-[8] border-1 border-custom-border',
        className,
      )}
      {...props}
    >
      <HeartIcon className="text-custom-primary-text" />
    </div>
  );
}
