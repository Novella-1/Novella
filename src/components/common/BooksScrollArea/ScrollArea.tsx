'use client';

import React, { useRef } from 'react';
import { CardItem } from '@/components/common/CardItem';
import {
  HorizontalScroll,
  ScrollButtons,
} from '@/components/ui/custom/scroll-area';

export function CardCarousel({ books }: { books: object[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-[310px] md:w-[584px] xl:w-[1136px] m-auto">
      <ScrollButtons scrollRef={scrollRef} />
      <HorizontalScroll
        ref={scrollRef}
        items={books}
      >
        <CardItem />
      </HorizontalScroll>
    </div>
  );
}
