'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

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
    : 'hidden md:flex items-center gap-14 pl-10';

  return (
    <nav className={clsx(containerClasses, className)}>
      {navLinks.map(({ name, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={clsx(
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
                  className={clsx(
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
