import React from 'react';
import { cn } from '@/lib/utils';

interface ImageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ImageContainer({
  className,
  children,
  ...props
}: ImageContainerProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}
