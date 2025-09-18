'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { FC, useState } from 'react';

import IconNav from './IconNav';
import Nav from './Nav';
import SearchBar from './SearchBar';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const Logo: FC<{ className?: string }> = ({ className }) => (
  <Link
    href="/"
    className="flex-shrink-0 items-start"
  >
    <Image
      src="/images/logo.png"
      alt="NOVELLA"
      width={120}
      height={40}
      className={className}
    />
  </Link>
);

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const { data, status } = useSession();

  // console.log('data', data);

  return (
    <header
      className={`${manrope.className} h-[48px] xl:h-[64px] border-b border-gray-200 bg-white shadow-md`}
    >
      <div className="relative flex h-full items-center px-6">
        <Logo className="h-10 w-auto cursor-pointer xl:h-14" />

        <Nav variant="desktop" />

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden xl:flex p-4">
            <SearchBar variant="desktop" />
          </div>

          <button
            className="ml-2 p-4 rounded-full transition hover:scale-105 hidden md:flex xl:hidden"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
          >
            <Search
              size={22}
              strokeWidth={1.5}
            />
          </button>

          <div className="hidden md:flex items-center">
            <IconNav variant="desktop" />
          </div>

          <button
            className="ml-2 p-2 md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu
              size={24}
              strokeWidth={1}
            />
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="absolute top-[48px] left-0 z-40 w-full border-b border-gray-200 bg-white px-4 py-3 md:block xl:hidden">
          <div className="relative mx-auto md:max-w-[640px]">
            <SearchBar variant="mobile" />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col bg-white"
          >
            <div className="flex h-[48px] items-center justify-between border-b px-6 shadow-md xl:h-[64px]">
              <Logo className="h-8 w-auto" />
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 mr-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xs mx-auto">
                <Nav variant="mobile" />
                <div className="mt-6">
                  <SearchBar variant="mobile" />
                </div>
              </div>
            </div>

            <div className="border-t">
              <div className="max-w-[720px] mx-auto">
                <IconNav
                  variant="mobile"
                  className="py-3"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
