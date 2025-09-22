'use client';

import React, { useRef } from 'react';

import {
  HorizontalScroll,
  ScrollButtons,
} from '@/components/ui/custom/scroll-area';
import { TypographyH2 } from '@/components/ui/custom/typography';
import { BookWithDetails } from '@/types/BookType';
import { CardItem } from '../CardItem/CardItem';

export function CardCarousel({
  books,
  title,
}: {
  books: BookWithDetails[];
  title: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full m-auto">
      <div className="flex justify-between items-center mb-4">
        <TypographyH2>{title}</TypographyH2>
        <ScrollButtons scrollRef={scrollRef} />
      </div>
      <HorizontalScroll
        ref={scrollRef}
        items={books}
      >
        {books.map((book) => {
          return (
            <CardItem
              key={book.slug}
              book={book}
              className="sm:min-w-[272px]"
            />
          );
        })}
      </HorizontalScroll>
    </div>
  );
}
