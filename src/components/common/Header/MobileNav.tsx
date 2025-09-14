import { FC } from 'react';
import NavLink from './NavLink';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'PAPER', href: '/paper' },
  { name: 'KINDLE', href: '/kindle' },
  { name: 'AUDIOBOOK', href: '/audiobook' },
];

const MobileNav: FC = () => (
  <nav className="flex flex-col space-y-4 text-center w-full">
    {navLinks.map((link) => (
      <NavLink
        key={link.href}
        href={link.href}
        name={link.name}
        className="font-medium text-gray-600 hover:text-black"
      />
    ))}
  </nav>
);

export default MobileNav;
