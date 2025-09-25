'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState, useTransition } from 'react';
import { TfiLayoutGrid4Alt, TfiLayoutGrid3Alt } from 'react-icons/tfi';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PageSizeSwitcherProps {
  className?: string;
}

export const PageSizeSwitcher: FC<PageSizeSwitcherProps> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPageSize, setCurrentPageSize] = useState(
    searchParams.get('pageSize') || '16',
  );
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentPageSize(searchParams.get('pageSize') || '16');
  }, [searchParams.toString()]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handlePageSizeChange(size: number) {
    setCurrentPageSize(size.toString());

    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', size.toString());
    params.set('page', '1');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }

  const renderButton = (size: number, Icon: FC<{ className?: string }>) => (
    <button
      type="button"
      onClick={() => handlePageSizeChange(size)}
      className={cn('p-1 rounded-md', {
        'opacity-50': isPending && +currentPageSize !== size,
      })}
      disabled={isPending && +currentPageSize !== size}
    >
      <Icon
        className={cn('w-6 h-6 cursor-pointer transition-colors', {
          'text-custom-header-footer': +currentPageSize === size,
          'text-custom-icons': +currentPageSize !== size,
        })}
      />
    </button>
  );

  if (!mounted) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Skeleton className="w-7 h-7 rounded-md bg-custom-button/10" />
        <Skeleton className="w-7 h-7 rounded-md bg-custom-button/10" />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {renderButton(16, TfiLayoutGrid4Alt)}
      {renderButton(9, TfiLayoutGrid3Alt)}
    </div>
  );
};
