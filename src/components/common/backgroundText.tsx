'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const titles: Record<string, string> = {
  '/paper': 'Paper books',
  '/audiobook': 'Audio books',
  '/kindle': 'Kindle books',
};

interface BackgroundTextProps {
  className?: string;
}

export function BackgroundText({ className, ...props }: BackgroundTextProps) {
  const pathname = usePathname();
  const text = titles[pathname] || '';

  if (!text) return null;

  const words = text.split(' ');

  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="max-w-500 absolute my-0 mx-auto inset-0 pointer-events-none z-0">
        <>
          <span className="font-martel sm:text-0 md:text-[140px] xl:text-[260px] font-black uppercase text-custom-text-decoration select-none absolute md:top-34 right-0 xl:top-14 xl:right-0">
            {words[0].toUpperCase()}
          </span>
          <span className="font-martel sm:text-0 md:text-[140px] xl:text-[260px] font-black uppercase text-custom-text-decoration select-none absolute md:top-180 left-0 xl:top-160 xl:left-0">
            {words[1].toUpperCase()}
          </span>
          <span className="font-martel sm:text-0 md:text-0 xl:text-[260px] font-black uppercase text-custom-text-decoration select-none absolute xl:top-300 xl:right-0">
            {words[0].toUpperCase()}
          </span>
          <span className="font-martel sm:text-0 md:text-0 xl:text-[260px] font-black uppercase text-custom-text-decoration select-none absolute xl:top-440 xl:left-0">
            {words[1].toUpperCase()}
          </span>
        </>
      </div>
    </div>
  );
}
