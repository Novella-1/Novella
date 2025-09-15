import React from 'react';
import BooksList from '@/components/common/BooksList/BooksList';
import Pagination from '@/components/common/Pagination/Pagination';
import { TypographyH1, TypographyP } from '@/components/ui/typography';

const PaperTemplate = () => {
  return (
    <div className="py-16">
      <div>
        <TypographyH1 className="text-custom-text-primary mb-2">
          Paper books
        </TypographyH1>
        <TypographyP className="text-custom-text-secondary">
          10,305 books
        </TypographyP>
      </div>

      {/*<Filtration/>*/}

      <BooksList className="mb-10" />

      <Pagination />
    </div>
  );
};

export default PaperTemplate;
