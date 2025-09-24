import { BookWithDetails } from '@/types/BookType';
import { CartItem } from '@/types/CartItemType';

// FAVOURITES

export const addToLocalFavourites = (book: BookWithDetails) => {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    const exists = favourites.some(
      (item: BookWithDetails) => item.slug === book.slug,
    );
    if (!exists) {
      favourites.push(book);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  } catch (err) {
    console.error('Error adding to favourites:', err);
  }
};

export const removeFromLocalFavourites = (bookSlug: string) => {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const updated = favourites.filter(
      (item: BookWithDetails) => item.slug !== bookSlug,
    );
    localStorage.setItem('favourites', JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing from favourites:', err);
  }
};

export const isInLocalFavourites = (bookSlug: string): boolean => {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    return favourites.some((item: BookWithDetails) => item.slug === bookSlug);
  } catch (err) {
    console.error('Error checking favourites:', err);
    return false;
  }
};

export const getLocalFavourites = (): BookWithDetails[] => {
  try {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  } catch (err) {
    console.error('Error getting favourites:', err);
    return [];
  }
};

// CART

export const addToLocalCart = (book: BookWithDetails, quantity: number = 1) => {
  try {
    if (typeof window === 'undefined') return;

    const cart: CartItem[] = getLocalCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.book.id === book.id,
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: crypto.randomUUID(),
        book: book,
        quantity: quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
};

export const removeFromLocalCart = (bookId: string) => {
  try {
    if (typeof window === 'undefined') return;

    const cart: CartItem[] = getLocalCart();
    const updatedCart = cart.filter((item) => item.book.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
};

export const updateLocalCartQuantity = (
  bookId: string,
  quantityChange: number,
) => {
  try {
    if (typeof window === 'undefined') return [];

    const cart: CartItem[] = getLocalCart();
    const itemIndex = cart.findIndex((item) => item.book.id === bookId);

    if (itemIndex >= 0) {
      cart[itemIndex].quantity += quantityChange;

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }

    return cart;
  } catch (err) {
    console.error('Error updating cart quantity:', err);
    return [];
  }
};

export const isInLocalCart = (bookId: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;

    const cart: CartItem[] = getLocalCart();
    return cart.some((item) => item.book.id === bookId);
  } catch (err) {
    console.error('Error checking cart:', err);
    return false;
  }
};

export const getLocalCart = (): CartItem[] => {
  try {
    if (typeof window === 'undefined') return [];

    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (err) {
    console.error('Error getting cart:', err);
    return [];
  }
};

export const getLocalCartItem = (bookId: string): CartItem | undefined => {
  try {
    if (typeof window === 'undefined') return undefined;

    const cart: CartItem[] = getLocalCart();
    return cart.find((item) => item.book.id === bookId);
  } catch (err) {
    console.error('Error getting cart item:', err);
    return undefined;
  }
};

export const getLocalCartCount = (): number => {
  try {
    if (typeof window === 'undefined') return 0;

    const cart: CartItem[] = getLocalCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  } catch (err) {
    console.error('Error getting cart count:', err);
    return 0;
  }
};

export const getLocalCartTotalPrice = (): number => {
  try {
    if (typeof window === 'undefined') return 0;

    const cart: CartItem[] = getLocalCart();
    return cart.reduce((total, item) => {
      const price = item.book.priceDiscount || item.book.priceRegular;
      return total + price * item.quantity;
    }, 0);
  } catch (err) {
    console.error('Error getting cart total price:', err);
    return 0;
  }
};

// export const clearLocalCart = (): void => {
//   try {
//     if (typeof window === 'undefined') return;

//     localStorage.removeItem('cart');
//     window.dispatchEvent(new CustomEvent('cartUpdated'));
//   } catch (err) {
//     console.error('Error clearing cart:', err);
//   }
// };
