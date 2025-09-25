'use client';

import { toast } from 'sonner';

type ToastAction =
  | 'addToFav'
  | 'removeFromFav'
  | 'addToCart'
  | 'removeFromCart'
  | 'successfullOrder'
  | 'loginError';

export function showToast(action: ToastAction, name?: string) {
  switch (action) {
    case 'addToFav':
      toast.info('Added to favorites!', {
        description: `${name} has been added to your favorites`,
        duration: 5000,
      });
      break;
    case 'removeFromFav':
      toast.info('Removed from favorites', {
        description: `${name} has been removed from your favorites`,
        duration: 5000,
      });
      break;
    case 'addToCart':
      toast.info('Added to cart!', {
        description: `${name} has been added to your cart`,
        duration: 5000,
      });
      break;
    case 'removeFromCart':
      toast.info('Removed from cart', {
        description: `${name} has been removed from your cart`,
        duration: 5000,
      });
      break;
    case 'successfullOrder':
      toast.info('Your order is successfuly created!', {
        description: `Thank you for your order! Our manager will get in touch with you soon.`,
        duration: 5000,
      });
    default:
      break;
  }
}
