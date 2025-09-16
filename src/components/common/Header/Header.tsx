'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Input } from '@/components/ui/input';

import DesktopIcons from './DesktopIcons';
import DesktopNav from './DesktopNav';
import MobileMenuIcons from './MobileMenuIcons';
import MobileNav from './MobileNav';
import MobileSearch from './MobileSearch';
import SearchAndCategory from './SearchAndCategory';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

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

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = mockBooks.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase()),
    );
    setResults(filtered);
  };

  return (
    <header
      className={`${manrope.className} bg-white border-b border-gray-200 h-[48px] xl:h-[64px] shadow-md `}
    >
      <div className="flex items-center justify-between h-full px-6 relative">
        <Link
          href="/"
          className="flex-shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="NOVELLA"
            width={120}
            height={40}
            className="cursor-pointer hidden sm:block h-10 w-auto xl:h-14"
          />
          <Image
            src="/images/logo.png"
            alt="NOVELLA"
            width={120}
            height={40}
            className="cursor-pointer sm:hidden h-10 w-auto xl:h-14"
          />
        </Link>

        <DesktopNav />

        <SearchAndCategory />

        <button
          className="hidden md:flex xl:hidden p-2 border-2 border-gray-200 rounded-full ml-auto transition hover:scale-105"
          onClick={() => setIsSearchOpen((prev) => !prev)}
          aria-label="Toggle search"
        >
          <Search
            size={20}
            color="#000"
            strokeWidth={1.5}
          />
        </button>

        {isSearchOpen && (
          <div className="absolute top-[48px] left-0 w-full bg-white border-b border-gray-200 z-40 px-4 py-3">
            <div className="relative max-w-md mx-auto">
              <Input
                placeholder="Find a book or author"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full placeholder:text-[#331F06] border-[#F4E2CD] font-bold"
              />

              <div className="hidden md:block">
                {results.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] mt-2 bg-white border border-[#F4E2CD] rounded-md shadow-lg z-50 p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {results.map((book) => (
                        <Link
                          href={`/book/${book.id}`}
                          key={book.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-[#F4E2CD] transition"
                        >
                          <div className="w-14 h-18 relative flex-shrink-0">
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

              <div className="block md:hidden">
                {results.length > 0 && (
                  <div className="absolute top-[70px] left-0 w-full bg-white border border-[#F4E2CD] rounded-md shadow-lg z-50 p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {results.map((book) => (
                        <Link
                          href={`/book/${book.id}`}
                          key={book.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-[#F4E2CD] transition"
                        >
                          <div className="w-14 h-18 relative flex-shrink-0">
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
            </div>
          </div>
        )}

        <DesktopIcons />

        {!isMenuOpen && (
          <button
            className="md:hidden p-2 ml-4 mr-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu
              size={24}
              color="#000"
              strokeWidth={1}
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between"
          >
            <div className="h-[48px] flex items-center justify-between px-6 border-b xl:h-[64px] shadow-md">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="NOVELLA"
                  width={100}
                  height={30}
                  className=""
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 mr-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-start space-y-6 overflow-y-auto">
              <MobileNav />
              <MobileSearch />
            </div>

            <MobileMenuIcons />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
