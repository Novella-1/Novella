import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const MobileMenuIcons: FC = () => (
  <div className="border-t border-gray-200 flex justify-around py-4 shadow-md">
    <Link href="/favorites">
      <Heart size={22} />
    </Link>
    <Link href="/cart">
      <ShoppingBag size={22} />
    </Link>
  </div>
);

export default MobileMenuIcons;
