import { CategoryItem } from '@/components/common/Category/CategoryItem';

const categories = [
  {
    id: 1,
    title: 'Paper books',
    bookCount: '10,305 books',
    imageSrc: '/category-cover-1.jpg',
  },
  {
    id: 2,
    title: 'Audiobooks',
    bookCount: '8,204 books',
    imageSrc: '/category-cover-2.png',
  },
  {
    id: 3,
    title: 'Kindle books',
    bookCount: '5,678 books',
    imageSrc: '/category-cover-3.png',
  },
];

export function CategoryList() {
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row gap-7 ">
      {categories.map(({ id, imageSrc, title, bookCount }) => (
        <CategoryItem
          key={id}
          imageSrc={imageSrc}
          title={title}
          bookCount={bookCount}
        />
      ))}
    </div>
  );
}
