'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
// import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { FC, useState } from 'react';

import AuthModal from '@/components/layout/AuthModal/AuthModal';
import { CartIcon, HeartIcon } from '@/components/ui/custom/icons';
import { LogoIcon } from '@/components/ui/custom/LogoIcon';
import { FavouritesHeaderIcon } from './FavouritesHeaderIcon';
import Nav from './Nav';
import SearchBar from './SearchBar';
import { ThemeButton } from './ThemeButton';

// const manrope = Manrope({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
// });

// const Logo: FC<{ className?: string }> = ({ className }) => (
//   <Link
//     href="/"
//     className="flex-shrink-0"
//   ></Link>
// );

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data, status } = useSession();

  console.log(data, status);

  return (
    <>
      <header
        className={`font-manrope fixed top-0 z-50 w-full h-[48px] xl:h-[64px] border-b border-custom-border bg-custom-header-footer`}
      >
        <div className="relative flex h-full items-center px-4">
          <LogoIcon className="h-10 w-auto cursor-pointer xl:h-14" />

          <Nav
            variant="desktop"
            className="hidden md:flex"
          />

          <div className="ml-auto flex items-center">
            <div className="hidden md:flex items-center gap-4 xl:gap-6">
              <div className="hidden xl:flex p-4">
                <SearchBar variant="desktop" />
              </div>

              <button
                className="rounded-full transition hover:scale-105 xl:hidden"
                onClick={() => setIsSearchOpen((p) => !p)}
                aria-label="Toggle search"
              >
                <Search className="w-4 h-4 xl:w-6 xl:h-6 text-custom-icons" />
              </button>

              {/* AUTH */}
              {status === 'authenticated' ?
                <span className="font-manrope text-custom-icons">{`Hello, ${data?.user?.firstName ?? 'user'}`}</span>
              : ''}
              <AuthModal />

              {/* <IconNav variant="desktop" /> */}
              <FavouritesHeaderIcon />
              <Link
                href="/cart"
                aria-label="Cart"
                className="flex items-center justify-center text-custom-icons"
              >
                <CartIcon className="w-4 h-4 xl:w-6 xl:h-6" />
              </Link>
              <ThemeButton />
            </div>

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
            <div className="flex h-[48px] items-center border-b px-4 shadow-md xl:h-[64px]">
              <LogoIcon className="h-10 w-auto" />
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
                <Nav
                  variant="mobile"
                  onLinkClick={() => setIsMenuOpen(false)}
                />
                <div className="mt-6">
                  <SearchBar variant="mobile" />
                </div>
              </div>
            </div>

            <div className="border-t">
              <div className="max-w-[720px] mx-auto">
                {/* <IconNav
                  variant="mobile"
                  className="py-3 text-custom-icons"
                /> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
