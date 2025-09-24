'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const titles: Record<string, string> = {
  '/paper': 'Paper books',
  '/audiobook': 'Audio books',
  '/kindle': 'Kindle books',
};

export function BackgroundText({
  className,
  ...props
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const text = titles[pathname] || '';
  const containerRef = useRef<HTMLDivElement>(null);

  const [repetitions, setRepetitions] = useState(0);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;

        const averageLineHeight = 220;
        const count = Math.ceil(containerHeight / averageLineHeight);
        setRepetitions(count);
      }
    };

    const timer = setTimeout(calculateRepetitions, 0);
    window.addEventListener('resize', calculateRepetitions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateRepetitions);
    };
  }, []);

  if (!text) return null;

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 pointer-events-none z-[-1] overflow-hidden ',
        className,
      )}
      {...props}
    >
      {Array.from({ length: repetitions }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'font-martel font-black uppercase select-none absolute leading-none text-custom-text-decoration text-[clamp(100px,18vw,260px)]',
            i % 2 === 0 ? 'right-0' : 'left-0',
          )}
          style={{
            top: `${i * 300}px`,
          }}
        >
          {words[i % words.length].toUpperCase()}
        </span>
      ))}
    </div>
  );
}
