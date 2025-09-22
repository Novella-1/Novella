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
    : 'hidden md:flex items-center gap-2 sm:gap-6 md:gap-10 lg:gap-14 pl-4 sm:pl-6 md:pl-10';

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
              isActive ? 'text-custom-icons' : (
                'text-custom-secondary hover:text-custom-primary'
              ),
              isMobile && 'font-bold hover:text-custom-primary',
            )}
          >
            <span className="relative inline-block">
              {name}
              {isActive && (
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
