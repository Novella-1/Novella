import { cn } from '@/lib/utils';
import { HeartIcon } from '../ui/custom/icons';

interface AddToFavoriteProps {
  className?: string;
}

export function AddToFavorite({ className, ...props }: AddToFavoriteProps) {
  return (
    <div
      className={cn(
        'flex w-10 h-10 p-3 items-center justify-center rounded-[8] border-1 border-main-elements-color',
        className,
      )}
      {...props}
    >
      <HeartIcon />
    </div>
  );
}
