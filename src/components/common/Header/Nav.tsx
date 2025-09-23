'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  stackForMobile?: boolean;
  className?: string;
  onLinkClick?: () => void;
}

const LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'PAPER', href: '/paper' },
  { name: 'KINDLE', href: '/kindle' },
  { name: 'AUDIOBOOK', href: '/audiobook' },
];

const Nav: FC<Props> = ({ stackForMobile = false, className, onLinkClick }) => {
  const pathname = usePathname();

  const desktopContainer =
    'hidden md:flex items-center gap-2 sm:gap-6 md:gap-10 lg:gap-14 pl-4 sm:pl-6 md:pl-10';
  const mobileContainer = 'flex flex-col space-y-4 text-center mx-auto';

  const container = stackForMobile ? mobileContainer : desktopContainer;

  return (
    <nav className={cn(container, className)}>
      {LINKS.map(({ name, href }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={cn(
              'relative font-bold transition-colors duration-200',
              active ? 'text-custom-icons' : (
                'text-custom-secondary hover:text-custom-primary'
              ),
              stackForMobile && 'font-bold hover:text-custom-primary',
            )}
          >
            <span className="relative inline-block">
              {name}
              {active && (
                <span
                  className={cn(
                    'absolute left-0 w-full h-[2px] bg-custom-icons transition-all duration-300',
                    'top-[20px] md:top-[34px] xl:top-[42px]',
                  )}
                />
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
