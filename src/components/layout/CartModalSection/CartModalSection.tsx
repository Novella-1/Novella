'use client';

import { useState } from 'react';
import CartModal from '@/components/common/CartModal/CartModal';

export const CartModalSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Товар 1',
      price: 100,
      quantity: 2,
    },
  ]);

  return <CartModal cartItems={cartItems} />;
};
