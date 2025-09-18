'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useEffect, FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { SortOrder, SortType } from '@/types/BookType';

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

type SortSelectProps = {
  className?: string;
};

export const SortSelect: FC<SortSelectProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [currentValue, setCurrentValue] = useState(
    searchParams.get('sortBy') && searchParams.get('sortOrder') ?
      `${searchParams.get('sortBy')}-${searchParams.get('sortOrder')}`
    : 'name-asc',
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentValue(
      searchParams.get('sortBy') && searchParams.get('sortOrder') ?
        `${searchParams.get('sortBy')}-${searchParams.get('sortOrder')}`
      : 'name-asc',
    );
  }, [searchParams.toString()]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(value: string) {
    const [sortBy, sortOrder] = value.split('-');
    setCurrentValue(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    params.set('page', '1');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {mounted ?
        <Select
          value={currentValue}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-[180px] bg-custom-icons cursor-pointer">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-custom-icons">
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
      : <Skeleton className="w-[180px] h-10 rounded-md bg-custom-button/10" />}

      {isPending && (
        <div className="relative">
          <div className="w-5 h-5 border-2 border-custom-icons border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
