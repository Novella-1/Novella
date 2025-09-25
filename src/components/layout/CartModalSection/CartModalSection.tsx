'use client';

import { useSession } from 'next-auth/react';
import CartModal from '@/components/common/CartModal/CartModal';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/ui/custom/icons';

export const CartModalSection = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Button
        variant="outline"
        className="relative text-custom-icons border-2"
      >
        <CartIcon
          // strokeWidth={2.5}
          className="w-4 h-4 xl:w-6 xl:h-6"
        />
      </Button>
    );
  }

  return <CartModal userId={session?.user?.id} />;
};
