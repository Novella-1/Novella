import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-[16px] border border-[#E2E6E9] bg-[#FFF] sm:w-[272px] sm:h-[506px] sm:p-8',
        className,
      )}
      {...props}
    />
  );
}

export { Card };
