'use client';

import { useCallback, useRef, useState } from 'react';
import { BookWithDetails } from '@/types/BookType';

export default function useBookSearch() {
  const [results, setResults] = useState<BookWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openResults, setOpenResults] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const runSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      setOpenResults(false);
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (abortController.current) abortController.current.abort();

    debounceTimer.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        abortController.current = new AbortController();

        const res = await fetch(
          `/api/search/books?query=${encodeURIComponent(term)}`,
          {
            signal: abortController.current.signal,
          },
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: BookWithDetails[] = await res.json();

        setResults(data);
        setOpenResults(true);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 600);
  }, []);

  return { results, isLoading, openResults, setOpenResults, runSearch };
}
