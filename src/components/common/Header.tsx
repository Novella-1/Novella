'use client';

import { Heart, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'PAPER', href: '/paper' },
  { name: 'KINDLE', href: '/kindle' },
  { name: 'AUDIOBOOK', href: '/audiobook' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header
      className={`${manrope.className} bg-white border-b border-gray-200 h-[48px] xl:h-[64px]`}
    >
      <div className="flex items-center justify-between h-full px-6 relative">
        {/* Логотип */}
        <Link
          href="/"
          className="flex-shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="NOVELLA"
            width={120}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop и Tablet меню */}
        <nav className="hidden md:flex items-center space-x-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop поиск + категории (1200px+) */}
        <div className="hidden xl:flex items-center space-x-4 ml-auto">
          <Input
            placeholder="Find a book or author"
            className="w-72"
          />
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="categories">Categories</SelectItem>
              <SelectItem value="phones">Paper</SelectItem>
              <SelectItem value="accessories">Audio</SelectItem>
              <SelectItem value="audio">Kindle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tablet: поиск через лупу (<1200px, ≥640px) */}
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

        {/* Desktop icons */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          <Link
            href="/favorites"
            className="border-2 border-gray-200 p-2 rounded-full transition hover:scale-105"
          >
            <Heart size={22} />
          </Link>
          <Link
            href="/cart"
            className="border-2 border-gray-200 p-2 rounded-full transition hover:scale-105"
          >
            <ShoppingBag size={22} />
          </Link>
        </div>

        {/* Mobile burger (<640px) */}
        <button
          className="md:hidden p-2 ml-4"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu
            size={24}
            color="#000"
            strokeWidth={1}
          />
        </button>
      </div>

      {/* Выпадающий поиск на планшете/мобиле */}
      {isSearchOpen && (
        <div className="absolute top-[36px] md:top-[48px] left-0 w-full bg-white border-b border-gray-200 p-4 z-40">
          <Input
            placeholder="Find a book or author"
            className="w-full"
          />
        </div>
      )}

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between ">
          {/* Верх: логотип + крестик */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="NOVELLA"
                width={100}
                height={30}
                className="cursor-pointer"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Центр: навигация + поиск */}
          <div className="flex-1 p-6 flex flex-col items-center justify-start space-y-6 overflow-y-auto">
            <nav className="flex flex-col space-y-4 text-center w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-medium text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="w-full max-w-xs space-y-4">
              <Input
                placeholder="Find a book or author"
                className="w-full"
              />
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="categories">Categories</SelectItem>
                  <SelectItem value="phones">Paper</SelectItem>
                  <SelectItem value="accessories">Audio</SelectItem>
                  <SelectItem value="audio">Kindle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Низ: иконки */}
          <div className="border-t border-gray-200 flex justify-around py-4">
            <Link href="/favorites">
              <Heart size={22} />
            </Link>
            <Link href="/cart">
              <ShoppingBag size={22} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
