import { cn } from '@/lib/utils';

interface RandomReadModalProps {
  className?: string;
}

export function RandomReadModal({ className, ...props }: RandomReadModalProps) {
  return (
    <div
      className={(cn('w-[230px] h-54 bg-'), className)}
      {...props}
    >
      children
    </div>
  );
}
