'use client';

import { useTheme } from 'next-themes';
import { CategoryItem } from './CategoryItem';

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

export function CategoryList() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row gap-7 ">
      {categories.map(({ id, imageSrc, title, bookCount }) => {
        const src =
          imageSrc[theme as keyof typeof imageSrc] || imageSrc.default;

        console.log(src);

        return (
          <CategoryItem
            key={id}
            imageSrc={src}
            title={title}
            bookCount={bookCount}
          />
        );
      })}
    </div>
  );
}
