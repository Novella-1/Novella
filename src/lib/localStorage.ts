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

// export const addToLocalCart = (book: BookWithDetails, quantity = 1) => {
//   try {
//     const cart: LocalCartItem[] = JSON.parse(
//       localStorage.getItem('cart') || '[]',
//     );

//     const existing = cart.find((item) => item.id === book.id);
//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       cart.push({
//         ...book,
//         quantity,
//         id: crypto.randomUUID(),
//       });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//   } catch (err) {
//     console.error('Error adding to cart:', err);
//   }
// };

export const removeFromLocalCart = (bookId: string) => {
  try {
    const cart: LocalCartItem[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    const updated = cart.filter((item) => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(updated));
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
};
export const isInLocalCart = (bookId: string): boolean => {
  try {
    const cart: LocalCartItem[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    return cart.some((item) => item.id === bookId);
  } catch (err) {
    console.error('Error checking cart:', err);
    return false;
  }
};

export const getLocalCart = (): LocalCartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (err) {
    console.error('Error getting cart:', err);
    return [];
  }
};
