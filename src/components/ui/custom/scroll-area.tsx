'use client';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BookWithDetails } from '@/types/BookType';

type HorizontalScrollProps = {
  items: BookWithDetails[];
  children: React.ReactNode;
};

type ScrollButtonsProps = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

const HorizontalScroll = forwardRef<HTMLDivElement, HorizontalScrollProps>(
  ({ items, children }, ref) => {
    return (
      <div
        ref={ref}
        className="flex overflow-x-auto scrollbar-hide gap-4 py-[10px]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            className="flex flex-shrink-0 w-[214px] h-[400px] sm:w-[272px] sm:h-[506px]"
          >
            {children}
          </div>
        ))}
      </div>
    );
  },
);
HorizontalScroll.displayName = 'HorizontalScroll';

const ScrollButtons: React.FC<ScrollButtonsProps> = ({ scrollRef }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    if (!scrollRef.current) return;
    checkScroll();
    const el = scrollRef.current;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [scrollRef]);

  const scrollBy = (direction: number) => {
    let actualOffset = direction * 290;
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      actualOffset = direction * 220;
    }
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: actualOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="invisible sm:visible flex justify-end gap-2 mb-4">
      {canScrollLeft && (
        <button
          className="rounded-full  flex items-center justify-center cursor-pointer"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeft size={34} />
        </button>
      )}
      {canScrollRight && (
        <button
          className="rounded-full  flex items-center justify-center cursor-pointer"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          <ChevronRight size={34} />
        </button>
      )}
    </div>
  );
};

export { ScrollArea, ScrollBar, HorizontalScroll, ScrollButtons };
