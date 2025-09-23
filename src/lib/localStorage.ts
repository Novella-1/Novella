import { BookWithDetails } from '@/types/BookType';

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
