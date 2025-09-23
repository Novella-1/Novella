'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import SearchBarSkeleton from './SearchBarSkeleton';
import useBookSearch from './useBookSearch';

interface Props {
  mobileFull?: boolean;
  inMobileMenu?: boolean;
  compact?: boolean;
}

export default function SearchBar({
  mobileFull = false,
  inMobileMenu = false,
}: Props) {
  const [query, setQuery] = useState('');
  const { results, isLoading, openResults, setOpenResults, runSearch } =
    useBookSearch();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      runSearch('');
      setOpenResults(false);
      return;
    }
    runSearch(query);
  }, [query, runSearch, setOpenResults]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenResults(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [setOpenResults]);

  const wrapperBase =
    'absolute top-full mt-2 bg-custom-header-footer rounded-xl z-50 p-4 overflow-y-auto custom-scrollbar';
  const desktopWrapper = 'w-[480px] -translate-x-1/2 left-1/2 max-h-[290px]';
  const mobileWrapper =
    'left-0 right-0 mx-auto w-full max-w-2xl max-h-[300px] border border-custom-border rounded-md';

  const renderResults = () => {
    if (!openResults || results.length === 0) return null;

    const wrapper = `${wrapperBase} ${mobileFull || inMobileMenu ? mobileWrapper : desktopWrapper}`;

    return (
      <div className={wrapper}>
        {results.map((book) => (
          <Link
            href={`/book/${book.slug}`}
            key={book.id}
            className={cn(
              'mb-2 last:mb-0 transition',
              mobileFull || inMobileMenu ?
                'flex items-center space-x-4 p-3 border rounded-lg bg-custom-header-bg hover:bg-custom-primary-bg'
              : 'flex items-center justify-between space-x-4 p-4 rounded-xl bg-custom-header-bg hover:bg-custom-hover-button',
            )}
          >
            <div className="flex items-center space-x-4">
              <div
                className={
                  mobileFull || inMobileMenu ?
                    'w-16 h-20 relative flex-shrink-0'
                  : 'w-16 h-[80px] relative flex-shrink-0'
                }
              >
                <Image
                  src={`/books/${book.images[0]}`}
                  alt={book.name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex flex-col">
                <span
                  className={
                    mobileFull || inMobileMenu ?
                      'font-bold text-primary'
                    : 'font-bold text-custom-primary-text'
                  }
                >
                  {book.name}
                </span>
                <span
                  className={
                    mobileFull || inMobileMenu ?
                      'text-secondary font-semibold'
                    : 'text-custom-secondary text-sm'
                  }
                >
                  {mobileFull || inMobileMenu ?
                    `$${book.priceRegular}`
                  : book.author}
                </span>
              </div>
            </div>

            {!mobileFull && !inMobileMenu && (
              <span className="text-custom-primary font-semibold text-xl">
                ${book.priceRegular}
              </span>
            )}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={
        mobileFull || inMobileMenu ? 'relative w-full' : (
          'relative w-full xl:w-[290px]'
        )
      }
    >
      <Input
        placeholder="Find a book or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpenResults(true)}
        className={
          mobileFull || inMobileMenu ?
            'w-full placeholder:text-custom-icons border-custom-icons text-custom-icons'
          : 'w-full placeholder:text-custom-icons font-bold bg-custom-header-footer border-custom-icons border-1 rounded-md h-9 px-4 focus:outline-none focus:ring-0 text-custom-icons'
        }
      />

      <AnimatePresence mode="wait">
        {isLoading ?
          <SearchBarSkeleton mobileFull={mobileFull || inMobileMenu} />
        : renderResults()}
      </AnimatePresence>
    </div>
  );
}
