import { cn } from '@/lib/utils';

interface ImageContainerProps {
  className?: string;
  children?: React.ReactNode;
}

export function ImageContainer({
  className,
  children,
  ...props
}: ImageContainerProps) {
  return (
    <div
      className={(cn(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
