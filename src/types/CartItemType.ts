import { BookWithDetails } from './BookType';

export type CartItem = {
  id: string;
  quantity: number;
  book: BookWithDetails;
};
