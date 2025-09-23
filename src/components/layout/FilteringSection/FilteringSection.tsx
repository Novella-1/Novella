'use client';

import { PageSizeSwitcher } from '@/components/common/Filtering/PageSizeSwitcher';
import { SortSelect } from '@/components/common/Filtering/SortSelect';
import { cn } from '@/lib/utils';

interface FilteringSectionProps {
  className?: string;
}

export function FilteringSection({
  className,
  ...props
}: FilteringSectionProps) {
  return (
    <section
      className={cn('flex justify-between', className)}
      {...props}
    >
      <SortSelect />
      <PageSizeSwitcher className="hidden sm:flex" />
    </section>
  );
}
