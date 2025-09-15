import { Heart, ShoppingBag } from 'lucide-react';
import { FC } from 'react';
import IconLink from './IconLink';

const DesktopIcons: FC = () => (
  <div className="hidden md:flex items-center space-x-4 ml-4">
    <IconLink
      href="/favorites"
      icon={Heart}
    />
    <IconLink
      href="/cart"
      icon={ShoppingBag}
    />
  </div>
);

export default DesktopIcons;
