import { HeartIcon } from '@/components/ui/custom/icons';
import { cn } from '@/lib/utils';

interface AddToFavoriteProps {
  className?: string;
}

export function AddToFavorite({ className, ...props }: AddToFavoriteProps) {
  return (
    <div
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
