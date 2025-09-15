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
        'relative pb-2 font-bold transition-colors duration-200',
        isActive ? 'text-black' : 'text-[#BAA48C] hover:text-black',
        className,
      )}
    >
      {name}
      {isActive && (
        <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-black rounded-full" />
      )}
    </Link>
  );
};

export default NavLink;
