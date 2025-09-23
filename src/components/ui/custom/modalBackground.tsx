import { cn } from '@/lib/utils';

interface ModalBackgroundProps {
  className?: string;
}

export function ModalBackground({ className, ...props }: ModalBackgroundProps) {
  return (
    <div
      className={(cn('w-full h-full bg-custom-modal-bg'), className)}
      {...props}
    ></div>
  );
}
