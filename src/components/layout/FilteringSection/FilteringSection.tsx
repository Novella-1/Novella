'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SortOrder, SortType } from '@/types/BookType';

interface FilteringSectionProps {
  className?: string;
}

type SortOption = {
  label: string;
  value: string;
  sortBy: SortType;
  sortOrder: SortOrder;
};

export const sortOptions: SortOption[] = [
  { label: 'Name', value: 'name-asc', sortBy: 'name', sortOrder: 'asc' },
  { label: 'Author', value: 'author-asc', sortBy: 'author', sortOrder: 'asc' },
  {
    label: 'Newest',
    value: 'publicationYear-desc',
    sortBy: 'publicationYear',
    sortOrder: 'desc',
  },
  {
    label: 'Oldest',
    value: 'publicationYear-asc',
    sortBy: 'publicationYear',
    sortOrder: 'asc',
  },
  {
    label: 'Lowest Price',
    value: 'priceRegular-asc',
    sortBy: 'priceRegular',
    sortOrder: 'asc',
  },
  {
    label: 'Highest Price',
    value: 'priceRegular-desc',
    sortBy: 'priceRegular',
    sortOrder: 'desc',
  },
];

export function FilteringSection({
  className,
  ...props
}: FilteringSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue =
    searchParams.get('sortBy') && searchParams.get('sortOrder') ?
      `${searchParams.get('sortBy')}-${searchParams.get('sortOrder')}`
    : 'name-asc';

  const currentPageSize = searchParams.get('pageSize') || '16';

  function handleChange(value: string) {
    const [sortBy, sortOrder] = value.split('-');

    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);

    router.push(`?${params.toString()}`);
  }

  function handlePageSizeChange(size: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', size.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <section
      className={cn('flex justify-between', className)}
      {...props}
    >
      <Select
        value={currentValue}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-3">
        <button onClick={() => handlePageSizeChange(16)}>
          <Image
            // src="/images/Table-4x4.png"
            src={
              +currentPageSize === 16 ?
                '/images/Table-active-4x4.png'
              : '/images/Table-4x4.png'
            }
            alt="4x4"
            width={22}
            height={22}
          />
        </button>
        <button onClick={() => handlePageSizeChange(9)}>
          <Image
            // src="/images/Table-3x3.png"
            src={
              +currentPageSize === 9 ?
                '/images/Table-active-3x3.png'
              : '/images/Table-3x3.png'
            }
            alt="3x3"
            width={22}
            height={22}
          />
        </button>
      </div>
    </section>
  );
}
