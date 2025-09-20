'use client';

import React, { useRef } from 'react';

import {
  HorizontalScroll,
  ScrollButtons,
} from '@/components/ui/custom/scroll-area';
import { BookWithDetails } from '@/types/BookType';
import { CardItem } from '../CardItem/CardItem';

export function CardCarousel({ books }: { books: BookWithDetails[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full xl:max-w-[1136px] m-auto">
      <ScrollButtons scrollRef={scrollRef} />
      <HorizontalScroll
        ref={scrollRef}
        items={books}
      >
        {books.map((book) => {
          return (
            <CardItem
              key={book.slug}
              book={book}
              className="min-w-[214px] sm:min-w-[272px]"
            />
          );
        })}
      </HorizontalScroll>
    </div>
  );
}
