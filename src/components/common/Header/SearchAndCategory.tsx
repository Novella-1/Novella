'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { ThemeButton } from './ThemeButton';

interface Book {
  id: number;
  title: string;
  image: string;
  price: string;
}

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'Елеанор і Парк',
    image: '/books/book1.jpg',
    price: '₴250',
  },
  {
    id: 2,
    title: 'Електра',
    image: '/books/book2.jpg',
    price: '₴300',
  },
  {
    id: 3,
    title: 'Електромеханічний конструктор. Аеромобіль',
    image: '/books/book3.jpg',
    price: '₴1200',
  },
];

const SearchAndCategory: FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = mockBooks.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase()),
    );
    setResults(filtered);
  };

  return (
    <div className="hidden xl:flex items-center space-x-8 ml-auto relative">
      <div className="relative w-50">
        <Input
          placeholder="Find a book or author"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="w-50 h-10 placeholder:text-[#331F06] border-[#BAA48C] bg-[#F4E2CD] text-[#331F06] font-bold"
        />
        {results.length > 0 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[48rem] mt-2 bg-white border border-[#BAA48C] rounded-md shadow-lg z-50 p-4">
            <div className="grid grid-cols-1 gap-4">
              {results.map((book) => (
                <Link
                  href={`/book/${book.id}`}
                  key={book.id}
                  className="flex items-center space-x-4 p-3 border border-[#F4E2CD] rounded-lg hover:bg-[#F4E2CD] transition"
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
                    <span className="font-bold text-[#331F06]">
                      {book.title}
                    </span>
                    <span className="text-[#BAA48C] font-semibold">
                      {book.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* <Select>
        <SelectTrigger className="w-48 h-10 bg-[#F4E2CD] text-[#331F06] font-bold border-[#BAA48C] rounded-md px-3 py-2">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="text-[#331F06] border border-[#BAA48C] selection:text-[#F4E2CD] font-bold">
          <SelectItem value="paper">Paper</SelectItem>
          <SelectItem value="audio">Audio</SelectItem>
          <SelectItem value="kindle">Kindle</SelectItem>
        </SelectContent>
      </Select> */}

      <ThemeButton />
    </div>
  );
};

export default SearchAndCategory;
