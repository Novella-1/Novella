'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface NavProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
  onLinkClick?: () => void;
}

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'PAPER', href: '/paper' },
  { name: 'KINDLE', href: '/kindle' },
  { name: 'AUDIOBOOK', href: '/audiobook' },
];

const Nav: FC<NavProps> = ({ variant = 'desktop', className, onLinkClick }) => {
  const pathname = usePathname();
  const isMobile = variant === 'mobile';

  const containerClasses =
    isMobile ?
      'flex flex-col space-y-4 text-center mx-auto'
    : 'hidden md:flex items-center gap-2 sm:gap-6 xl:gap-14 pl-4 sm:pl-6 text-xs xl:text-base';

  return (
    <nav className={cn(containerClasses, className)}>
      {navLinks.map(({ name, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={cn(
              'relative font-bold transition-colors duration-200 text-custom-icons',
              isActive ?
                'text-custom-text-hover'
              : 'text-custom-icons hover:text-custom-text-hover',
              isMobile && 'font-bold hover:text-custom-text-hover',
            )}
          >
            <span className="relative inline-block">
              {name}
              {isActive && (
                <span
                  className={cn(
                    'absolute left-0 w-full h-[1px] md:h-[2px] xl:h-1 bg-custom-text-hover transition-all duration-300',
                    'top-[26px] md:top-[30px] xl:top-[40px]',
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
