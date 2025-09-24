import { cn } from '@/lib/utils';
import { BackgroundText } from '../ui/backgroundText';

interface PageWrapper {
  className?: string;
  children: React.ReactNode;
}

export function PageWrapper({ className, children, ...props }: PageWrapper) {
  return (
    <div
      className={cn('max-w-[1136px] mx-auto px-4 sm:px-6 lg:px-0', className)}
      {...props}
    >
      <BackgroundText />
      {children}
    </div>
  );
}
