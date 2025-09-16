'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

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
  {
    id: 4,
    title: 'Ерагон',
    image: '/books/book4.jpg',
    price: '₴400',
  },
];

const MobileSearch: FC = () => {
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
    <div className="w-full max-w-xs space-y-4 relative">
      <Input
        placeholder="Find a book or author..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border-[#BAA48C] bg-[#F4E2CD] text-[#331F06] placeholder:text-[#331F06] font-bold"
      />

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mx-auto w-full max-w-2xl mt-2 bg-white border border-[#F4E2CD] rounded-md shadow-lg z-50 p-4">
          <div className="grid grid-cols-1 gap-4">
            {results.map((book) => (
              <Link
                href={`/book/${book.id}`}
                key={book.id}
                className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-[#F4E2CD] transition"
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
                  <span className="font-bold text-[#331F06]">{book.title}</span>
                  <span className="text-[#BAA48C] font-semibold">
                    {book.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Select>
        <SelectTrigger className="w-full border-[#BAA48C] bg-[#F4E2CD] text-[#331F06] font-bold">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="text-[#331F06] border border-[#BAA48C] selection:text-[#F4E2CD] font-bold">
          <SelectItem value="paper">Paper</SelectItem>
          <SelectItem value="audio">Audio</SelectItem>
          <SelectItem value="kindle">Kindle</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileSearch;
