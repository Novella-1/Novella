'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import AuthModal from '@/components/layout/AuthModal/AuthModal';
import IconNav from './IconNav';
import Nav from './Nav';
import SearchBar from './SearchBar';
import ThemeButton from './ThemeButton';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

function Logo({ className = '' }: { className?: string }) {
  return (
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
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { data: sessionData, status: authStatus } = useSession();

  return (
    <>
      <header
        className={`${manrope.className} fixed top-0 z-50 w-full h-[48px] xl:h-[64px] border-b border-custom-border bg-custom-header-footer shadow-md`}
      >
        <div className="relative flex h-full items-center px-6">
          <Logo className="h-10 w-auto cursor-pointer xl:h-14" />

          <Nav />

          <div className="ml-auto flex items-center">
            <div className="hidden md:flex items-center gap-4">
              <div className="hidden xl:flex p-4">
                <div className="relative w-[290px]">
                  <SearchBar />
                </div>
              </div>

              <button
                type="button"
                className="p-4 rounded-full transition hover:scale-105 xl:hidden"
                onClick={() => setIsSearchVisible((v) => !v)}
                aria-label="Toggle search"
              >
                <Search
                  size={22}
                  strokeWidth={1.5}
                  className="text-custom-icons"
                />
              </button>

              {authStatus === 'authenticated' && (
                <span>{`Hello, ${sessionData?.user?.firstName ?? 'user'}`}</span>
              )}
              <AuthModal />

              <IconNav />
              <ThemeButton />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeButton />
              <button
                type="button"
                className="p-2"
                onClick={() => setIsMobileMenuOpen(true)}
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

        {isSearchVisible && (
          <div className="absolute top-[48px] left-0 z-40 w-full border-b border-custom-border bg-custom-header-footer shadow-md px-4 py-3 md:block xl:hidden">
            <div className="relative mx-auto md:max-w-[640px]">
              <SearchBar
                inMobileMenu={false}
                compact
              />
            </div>
          </div>
        )}
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col bg-custom-header-footer"
          >
            <div className="flex h-[48px] items-center border-b px-6 shadow-md xl:h-[64px]">
              <Logo className="h-8 w-auto" />
              <div className="ml-auto flex items-center gap-2">
                <ThemeButton />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-custom-icons"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xs mx-auto w-full">
                <Nav
                  stackForMobile
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />
                <div className="mt-6">
                  <SearchBar
                    inMobileMenu
                    mobileFull
                  />
                </div>
              </div>
            </div>

            <div className="border-t">
              <div className="max-w-[720px] mx-auto">
                <IconNav
                  mobileFooter
                  className="py-3 text-custom-icons"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
