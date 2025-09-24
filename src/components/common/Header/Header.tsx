'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { FC, useState } from 'react';

import AuthModal from '@/components/layout/AuthModal/AuthModal';
import { CartModalSection } from '@/components/layout/CartModalSection/CartModalSection';
import { LogoIcon } from '@/components/ui/custom/LogoIcon';
// import { CartModalSection } from '../../layout/CartModalSection/CartModalSection';
import { FavouritesHeaderIcon } from './FavouritesHeaderIcon';
import Nav from './Nav';
import SearchBar from './SearchBar';
import { ThemeButton } from './ThemeButton';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data, status } = useSession();

  console.log('status', data);

  return (
    <>
      <header
        className={`font-manrope fixed top-0 z-50 w-full h-[48px] xl:h-[64px] shadow-xs bg-custom-header-footer`}
      >
        <div className="relative flex h-full items-center px-4">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center justify-center"
          >
            <LogoIcon className="h-10 w-auto cursor-pointer xl:h-14" />
          </Link>

          <Nav
            variant="desktop"
            className="hidden md:flex"
          />

          <div className="ml-auto flex items-center">
            <div className="hidden md:flex items-center gap-4 xl:gap-6">
              <div className="hidden xl:flex">
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
              <FavouritesHeaderIcon userId={data?.user.id} />

              <CartModalSection />
              <ThemeButton />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeButton />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="text-custom-icons h-4 w-4" />
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
            <div className="flex justify-around items-center h-[48px] border-t px-4 shadow-[0_-1px_8px_0_rgba(0,0,0,0.10)]">
              <AuthModal />
              <FavouritesHeaderIcon />

              <CartModalSection />
            </div>

            <div className="border-t">
              <div className="max-w-[720px] mx-auto"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
