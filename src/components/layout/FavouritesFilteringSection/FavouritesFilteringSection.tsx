'use client';

import { PageSizeSwitcher } from '@/components/common/Filtering/PageSizeSwitcher';
// import { SortSelect } from '@/components/common/Filtering/SortSelect';
import { cn } from '@/lib/utils';

interface FavouritesFilteringSectionProps {
  className?: string;
}

export function FavouritesFilteringSection({
  className,
  ...props
}: FavouritesFilteringSectionProps) {
  return (
    <section
      className={cn('flex justify-between mb-6', className)}
      {...props}
    >
      {/* <SortSelect /> */}
      <PageSizeSwitcher className="hidden sm:flex" />
    </section>
  );
}
