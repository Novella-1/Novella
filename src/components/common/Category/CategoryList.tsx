'use client';

import { useTheme } from 'next-themes';
import { BookCountsResponse } from '@/components/layout/CategorySection/CategorySection';
import { BookType } from '@/types/BookType';
import { CategoryItem } from './CategoryItem';

const typeToCategoryId: Record<BookType, number> = {
  PAPERBACK: 1,
  AUDIOBOOK: 2,
  KINDLE: 3,
};

const typeToSlug: Record<BookType, string> = {
  PAPERBACK: 'paper',
  AUDIOBOOK: 'audiobook',
  KINDLE: 'kindle',
};

export const categories = [
  {
    id: 1,
    title: 'Paper books',
    bookCount: '10,305 books',
    imageSrc: {
      default: '/images/categories/category-cover-1.png',
      protanopia: '/images/categories/category-cover-1-prot.png',
      deuteranopia: '/images/categories/category-cover-1-deu.png',
      tritanopia: '/images/categories/category-cover-1-tri.png',
    },
  },
  {
    id: 2,
    title: 'Audiobooks',
    bookCount: '8,204 books',
    imageSrc: {
      default: '/images/categories/category-cover-2.png',
      protanopia: '/images/categories/category-cover-2-prot.png',
      deuteranopia: '/images/categories/category-cover-2-deu.png',
      tritanopia: '/images/categories/category-cover-2-tri.png',
    },
  },
  {
    id: 3,
    title: 'Kindle books',
    bookCount: '5,678 books',
    imageSrc: {
      default: '/images/categories/category-cover-3.png',
      protanopia: '/images/categories/category-cover-3-prot.png',
      deuteranopia: '/images/categories/category-cover-3-deu.png',
      tritanopia: '/images/categories/category-cover-3-tri.png',
    },
  },
];

export function CategoryList({
  categoriesCount,
}: {
  categoriesCount: BookCountsResponse;
}) {
  const { counts } = categoriesCount;
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center flex-col md:flex-row gap-4 ">
      {categories.map(({ id, imageSrc, title }) => {
        const src =
          imageSrc[theme as keyof typeof imageSrc] || imageSrc.default;

        const countObj = counts.find((c) => typeToCategoryId[c.type] === id);
        const matched = counts.find((c) => typeToCategoryId[c.type] === id);
        const slug = matched ? typeToSlug[matched.type] : '';

        console.log(countObj);

        return (
          <CategoryItem
            key={id}
            imageSrc={src}
            title={title}
            bookCount={countObj ? `${countObj.count} books` : '0 books'}
            slug={slug}
          />
        );
      })}
    </div>
  );
}
