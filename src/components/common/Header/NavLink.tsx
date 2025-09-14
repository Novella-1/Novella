import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  name: string;
  className?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, name, className }) => (
  <Link
    href={href}
    className={`text-gray-700 hover:text-black font-medium transition-colors duration-200 ${className}`}
  >
    {name}
  </Link>
);

export default NavLink;
