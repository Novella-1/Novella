import { FC } from 'react';
import NavLink from './NavLink';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'PAPER', href: '/paper' },
  { name: 'KINDLE', href: '/kindle' },
  { name: 'AUDIOBOOK', href: '/audiobook' },
];

const DesktopNav: FC = () => (
  <nav className="hidden md:flex items-center gap-16 pl-10">
    {navLinks.map((link) => (
      <NavLink
        key={link.href}
        href={link.href}
        name={link.name}
      />
    ))}
  </nav>
);

export default DesktopNav;
