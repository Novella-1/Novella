'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { BookWithDetails } from '@/types/BookType';
import { SearchBarSkeleton } from './SearchBarSkeleton';

export interface SearchBarProps {
  variant: 'desktop' | 'mobile';
}

const SearchBar: FC<SearchBarProps> = ({ variant }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedSearch = useCallback((searchTerm: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        setLoading(true);
        abortControllerRef.current = new AbortController();

        const res = await fetch(
          `/api/search/books?query=${encodeURIComponent(searchTerm)}`,
          { signal: abortControllerRef.current.signal },
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: BookWithDetails[] = await res.json();
        setResults(data);
        setOpen(true);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 600);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const renderResults = () => {
    if (!open || results.length === 0) return null;

    const containerClasses =
      variant === 'mobile' ?
        'absolute top-full left-0 right-0 mx-auto w-full max-w-2xl mt-2 bg-custom-header-footer border border-custom-border rounded-md shadow-lg z-50 p-4 max-h-[300px] overflow-y-auto custom-scrollbar'
      : 'absolute top-full left-1/3 mt-4 bg-custom-header-footer rounded-xl z-50 p-4 max-h-[290px] overflow-y-auto custom-scrollbar w-[480px] -translate-x-1/2';

    return (
      <div className={containerClasses}>
        {results.map((book) => (
          <Link
            href={`/book/${book.slug}`}
            key={book.id}
            className={
              variant === 'mobile' ?
                'flex items-center space-x-4 p-3 rounded-lg hover:border-custom-border bg-custom-header-bg hover:bg-custom-primary-bg transition mb-2 last:mb-0'
              : 'flex items-center justify-between space-x-4 p-4 rounded-xl hover:border-custom-border bg-custom-header-bg transition hover:bg-custom-primary-bg mb-2 last:mb-0'
            }
          >
            <div className="flex items-center space-x-4">
              <div
                className={
                  variant === 'mobile' ?
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
                    variant === 'mobile' ?
                      'font-bold text-primary'
                    : 'font-bold text-custom-primary-text'
                  }
                >
                  {book.name}
                </span>
                <span
                  className={
                    variant === 'mobile' ?
                      'text-secondary font-semibold'
                    : 'text-custom-secondary text-sm'
                  }
                >
                  {variant === 'mobile' ? `$${book.priceRegular}` : book.author}
                </span>
              </div>
            </div>
            {variant !== 'mobile' && (
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
        variant === 'mobile' ? 'relative w-full' : 'relative w-[290px]'
      }
    >
      <Input
        placeholder="Find a book or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        className={
          variant === 'mobile' ?
            'w-full placeholder:text-custom-icons border-custom-icons text-custom-icons'
          : 'w-full placeholder:text-custom-icons font-bold bg-custom-header-footer border-custom-icons border-1 rounded-md h-9 px-4 focus:outline-none focus:ring-0 text-custom-icons'
        }
      />
      <AnimatePresence mode="wait">
        {loading ?
          <SearchBarSkeleton variant={variant} />
        : renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
