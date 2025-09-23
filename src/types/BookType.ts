import { AudiobookDetails, KindleDetails, PaperDetails } from '@prisma/client';

export type BookType = 'PAPERBACK' | 'KINDLE' | 'AUDIOBOOK';
export type SortType = 'name' | 'author' | 'priceRegular' | 'publicationYear';
export type SortOrder = 'asc' | 'desc';

export type PageSize = 9 | 16;

export type BaseBook = {
  id: string;
  type: BookType;
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  langAvailable: string[];
  lang: string;
  author: string;
  publicationYear: number;
  publication: string;
  description: string[];
  categories: string[];
};

export type PaperBook = BaseBook & {
  type: 'PAPERBACK';
  paperDetails: PaperDetails;
  kindleDetails: null;
  audiobookDetails: null;
};

export type KindleBook = BaseBook & {
  type: 'KINDLE';
  paperDetails: null;
  kindleDetails: KindleDetails;
  audiobookDetails: null;
};

export type AudiobookBook = BaseBook & {
  type: 'AUDIOBOOK';
  paperDetails: null;
  kindleDetails: null;
  audiobookDetails: AudiobookDetails;
};

export type BookWithDetails = PaperBook | KindleBook | AudiobookBook;
