'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Input } from '@/components/ui/input';

export interface Book {
  id: number;
  title: string;
  image: string;
  price: string;
  maintext?: string;
  nonmaintext?: string;
}

export interface SearchBarProps {
  variant: 'desktop' | 'mobile';
}

const bookImages = [
  '/img/paperback/1984/en/00.webp',
  '/img/paperback/1984/en/01.webp',
  '/img/paperback/1984/en/02.webp',
  '/img/paperback/1984/en/03.webp',
  '/img/paperback/1984/en/04.webp',
];

const mobileBooks: Book[] = [
  { id: 1, title: 'Елеанор і Парк', image: bookImages[0], price: '₴250' },
  { id: 2, title: 'Електра', image: bookImages[1], price: '₴300' },
  {
    id: 3,
    title: 'Електромеханічний конструктор. Аеромобіль',
    image: bookImages[2],
    price: '₴1200',
  },
  { id: 4, title: 'Ерагон', image: bookImages[3], price: '₴400' },
];

const desktopBooks: Book[] = [
  {
    id: 1,
    title: 'Елеанор і Парк',
    image: bookImages[0],
    price: '₴300',
    maintext: 'The Goldfinch',
    nonmaintext: 'Donna Tartt',
  },
  {
    id: 2,
    title: 'Електра',
    image: bookImages[1],
    price: '₴300',
    maintext: 'Електра',
    nonmaintext: 'Триллер',
  },
  {
    id: 3,
    title: 'Електромеханічний конструктор. Аеромобіль',
    image: bookImages[2],
    price: '₴300',
    maintext: 'Конструктор',
    nonmaintext: 'Технічна література',
  },
  {
    id: 4,
    title: 'Книга 4',
    image: bookImages[3],
    price: '₴400',
    maintext: 'Другая книга',
    nonmaintext: 'Другой автор',
  },
  {
    id: 5,
    title: 'Книга 5',
    image: bookImages[4],
    price: '₴500',
    maintext: 'Пятая книга',
    nonmaintext: 'Автор пять',
  },
  {
    id: 6,
    title: 'Книга 6',
    image: bookImages[0],
    price: '₴600',
    maintext: 'Шестая книга',
    nonmaintext: 'Шестой автор',
  },
  {
    id: 7,
    title: 'Книга 7',
    image: bookImages[1],
    price: '₴700',
    maintext: 'Седьмая книга',
    nonmaintext: 'Седьмой автор',
  },
];

const SearchBar: FC<SearchBarProps> = ({ variant }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const term = value.toLowerCase();
    const source = variant === 'desktop' ? desktopBooks : mobileBooks;

    const filtered = source.filter((book) => {
      if (variant === 'desktop') {
        return (
          book.title.toLowerCase().includes(term) ||
          book.maintext?.toLowerCase().includes(term) ||
          book.nonmaintext?.toLowerCase().includes(term)
        );
      }
      return book.title.toLowerCase().includes(term);
    });

    setResults(filtered);
  };

  if (variant === 'mobile') {
    return (
      <div className="relative w-full">
        <Input
          placeholder="Find a book or author..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full placeholder:text-custom-icons border-custom-icons text-custom-icons"
        />

        {results.length > 0 && (
          <div
            className="
              absolute top-full left-0 right-0 mx-auto 
              w-full max-w-2xl mt-2 
              bg-custom-secondary border border-custom-main-elements 
              rounded-md shadow-lg z-50 p-4 
              max-h-[300px] overflow-y-auto custom-scrollbar
            "
          >
            {results.map((book) => (
              <Link
                href={`/book/${book.id}`}
                key={book.id}
                className="
                  flex items-center space-x-4 p-3 border rounded-lg 
                  bg-custom-header-bg hover:bg-custom-main-elements 
                  transition mb-2 last:mb-0
                "
              >
                <div className="w-16 h-20 relative flex-shrink-0">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-primary">{book.title}</span>
                  <span className="text-secondary font-semibold">
                    {book.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-[290px]">
      <Input
        placeholder="Find a book or author"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="
          w-full placeholder:text-custom-icons font-bold 
          bg-custom-header-footer  border-custom-icons border-1 
          rounded-md h-9 px-4 focus:outline-none focus:ring-0  text-custom-icons
        "
      />

      {results.length > 0 && (
        <div
          className="
            absolute top-full left-1/2 mt-4 
            bg-custom-secondary rounded-xl z-50 p-4 
            max-h-[290px] overflow-y-auto custom-scrollbar
          "
          style={{ width: '480px', transform: 'translateX(-50%)' }}
        >
          {results.map((book) => (
            <Link
              href={`/book/${book.id}`}
              key={book.id}
              className="
                flex items-center justify-between space-x-4 p-4 rounded-xl 
                bg-custom-header-bg transition hover:bg-gray-50 
                mb-2 last:mb-0
              "
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-[80px] relative flex-shrink-0">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-custom-primary-text">
                    {book.maintext}
                  </span>
                  <span className="text-custom-secondary text-sm">
                    {book.nonmaintext}
                  </span>
                </div>
              </div>
              <span className="text-custom-primary font-semibold text-xl">
                {book.price}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
