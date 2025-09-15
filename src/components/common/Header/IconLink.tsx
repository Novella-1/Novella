import Link from 'next/link';
import { FC } from 'react';

interface IconLinkProps {
  href: string;
  icon: React.ElementType;
  className?: string;
}

const IconLink: FC<IconLinkProps> = ({ href, icon: Icon, className }) => (
  <Link
    href={href}
    className={`border-2 border-gray-200 p-2 rounded-full transition hover:scale-105 ${className}`}
  >
    <Icon size={22} />
  </Link>
);

export default IconLink;
