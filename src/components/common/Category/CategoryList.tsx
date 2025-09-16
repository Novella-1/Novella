import { CategoryItem } from '@/components/common/Category/CategoryItem';

const categories = [
  {
    id: 1,
    title: 'Paper books',
    bookCount: '10,305 books',
    imageSrc: '/catagory-cover.jpg',
  },
  {
    id: 2,
    title: 'Audiobooks',
    bookCount: '8,204 books',
    imageSrc: '/catagory-cover.jpg',
  },
  {
    id: 3,
    title: 'Kindle books',
    bookCount: '5,678 books',
    imageSrc: '/catagory-cover.jpg',
  },
];

export function CategoryList() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 overflow-x-auto">
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
