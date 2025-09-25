import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState, useTransition } from 'react';
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

  const renderButton = (
    size: number,
    activeImg: string,
    inactiveImg: string,
  ) => (
    <button
      onClick={() => handlePageSizeChange(size)}
      className={cn('relative', {
        'opacity-50': isPending && +currentPageSize !== size,
      })}
      disabled={isPending && +currentPageSize !== size}
    >
      <Image
        src={+currentPageSize === size ? activeImg : inactiveImg}
        alt={`${size} view`}
        width={22}
        height={22}
        className="cursor-pointer"
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
      {renderButton(
        16,
        '/images/table4x4.png',
        '/images/table4x4-inactive.png',
      )}
      {renderButton(9, '/images/table3x3.png', '/images/table3x3-inactive.png')}
    </div>
  );
};
