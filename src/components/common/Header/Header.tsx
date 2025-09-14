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

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header
      className={`${manrope.className} bg-white border-b border-gray-200 h-[48px] xl:h-[64px]`}
    >
      <div className="flex items-center justify-between h-full px-6 relative">
        <Link
          href="/"
          className="flex-shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="NOVELLA"
            width={100}
            height={40}
            className="cursor-pointer hidden sm:block"
          />
          <Image
            src="/images/logo.png"
            alt="NOVELLA"
            width={100}
            height={30}
            className="cursor-pointer sm:hidden"
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

      {isSearchOpen && (
        <div className="absolute top-[36px] md:top-[48px] left-0 w-full bg-white border-b border-gray-200 p-4 z-40">
          <Input
            placeholder="Find a book or author"
            className="w-full"
          />
        </div>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between"
          >
            <div className="h-[48px] flex items-center justify-between px-6 border-b">
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
