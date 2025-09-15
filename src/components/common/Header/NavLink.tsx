'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  name: string;
  className?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, name, className }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'relative flex items-center justify-center font-bold transition-colors duration-200',
        isActive ? 'text-black' : 'text-[#BAA48C] hover:text-black',
        className,
      )}
    >
      {name}
      {isActive && (
        <span
          className={clsx(
            'absolute left-0 w-full h-[2px] bg-black transition-all duration-300',
            'top-[34px] xl:top-[42px]', // моб/таб = 34px, десктоп = 42px
          )}
        />
      )}
    </Link>
  );
};

export default NavLink;
