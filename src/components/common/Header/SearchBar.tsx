'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { BookWithDetails } from '@/types/BookType';

export interface SearchBarProps {
  variant: 'desktop' | 'mobile';
}

const SearchBar: FC<SearchBarProps> = ({ variant }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookWithDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search/books?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setOpen(true);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const renderResults = () => {
    if (!open || results.length === 0) return null;

    if (variant === 'mobile') {
      return (
        <div className="absolute top-full left-0 right-0 mx-auto w-full max-w-2xl mt-2 bg-custom-header-footer border border-custom-border rounded-md shadow-lg z-50 p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
          {results.map((book) => (
            <Link
              href={`/book/${book.slug}`}
              key={book.id}
              className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-custom-primary-bg transition mb-2 last:mb-0"
            >
              <div className="w-16 h-20 relative flex-shrink-0">
                <Image
                  src={`/books/${book.images[0]}`}
                  alt={book.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-primary">{book.name}</span>
                <span className="text-secondary font-semibold">
                  ${book.priceRegular}
                </span>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return (
      <div
        className="absolute top-full left-1/2 mt-4 bg-custom-header-footer border border-custom-border rounded-xl z-50 p-4 max-h-[290px] overflow-y-auto custom-scrollbar"
        style={{ width: '480px', transform: 'translateX(-50%)' }}
      >
        {results.map((book) => (
          <Link
            href={`book/${book.slug}`}
            key={book.id}
            className="flex items-center justify-between space-x-4 p-4 rounded-xl border transition hover:bg-custom-primary-bg mb-2 last:mb-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-[80px] relative flex-shrink-0">
                <Image
                  src={`/books/${book.images[0]}`}
                  alt={book.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-custom-primary-text">
                  {book.name}
                </span>
                <span className="text-custom-secondary text-sm">
                  {book.author}
                </span>
              </div>
            </div>
            <span className="text-custom-primary font-semibold text-xl">
              ${book.priceRegular}
            </span>
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
      {/* SKELETON */}
      {loading && (
        <>
          {variant === 'mobile' ?
            <div className="absolute top-full mt-2 w-full max-w-2xl bg-custom-header-footer border border-custom-main-elements rounded-md shadow-lg z-50 p-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 mb-3 animate-pulse"
                >
                  <div className="w-16 h-20 bg-custom-icons/40 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-custom-icons/40 rounded w-3/4"></div>
                    <div className="h-3 bg-custom-icons/40 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          : <div
              className="absolute top-full left-1/2 mt-4 bg-custom-header-footer rounded-xl z-50 p-6 max-h-[290px] overflow-y-auto custom-scrollbar shadow-lg"
              style={{ width: '480px', transform: 'translateX(-50%)' }}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between space-x-6 mb-4 animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-[100px] bg-custom-icons/40 rounded-lg"></div>
                    <div className="flex flex-col space-y-3">
                      <div className="h-5 bg-custom-icons/40 rounded w-40"></div>
                      <div className="h-4 bg-custom-icons/40 rounded w-28"></div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-custom-icons/40 rounded"></div>
                </div>
              ))}
            </div>
          }
        </>
      )}
      {renderResults()}
    </div>
  );
};

export default SearchBar;
