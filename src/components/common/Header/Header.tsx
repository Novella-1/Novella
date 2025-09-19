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
import { ThemeButton } from './ThemeButton';

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
  const { data, status } = useSession();

  console.log(data, status);

  return (
    <>
      <header
        className={`${manrope.className} fixed top-0 z-50 w-full h-[48px] xl:h-[64px] border-b border-custom-border bg-custom-header-footer shadow-md`}
      >
        <div className="relative flex h-full items-center px-6">
          <Logo className="h-10 w-auto cursor-pointer xl:h-14" />

          <Nav variant="desktop" />

          <div className="ml-auto flex items-center">
            {/* Desktop & Tablet */}
            <div className="hidden md:flex items-center gap-4">
              <div className="hidden xl:flex p-4">
                <SearchBar variant="desktop" />
              </div>

              <button
                className="p-4 rounded-full transition hover:scale-105 xl:hidden"
                onClick={() => setIsSearchOpen((p) => !p)}
                aria-label="Toggle search"
              >
                <Search
                  size={22}
                  strokeWidth={1.5}
                  className="text-custom-icons"
                />
              </button>

              <IconNav variant="desktop" />

              <ThemeButton />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeButton />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu
                  size={24}
                  strokeWidth={1}
                  className="text-custom-icons"
                />
              </button>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-[48px] left-0 z-40 w-full border-b border-custom-border bg-custom-header-footer shadow-md px-4 py-3 md:block xl:hidden">
            <div className="relative mx-auto md:max-w-[640px]">
              <SearchBar variant="mobile" />
            </div>
          </div>
        )}
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col bg-custom-header-footer"
          >
            {/* full-screen overlay header */}
            <div className="flex h-[48px] items-center border-b px-6 shadow-md xl:h-[64px]">
              <Logo className="h-8 w-auto" />

              <div className="ml-auto flex items-center gap-2">
                <ThemeButton />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-custom-icons"
                >
                  <X size={24} />
                </button>
              </div>
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
                  className="py-3 text-custom-icons"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
