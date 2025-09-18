import Link from 'next/link';
import React from 'react';
import { TypographyH5 } from '@/components/ui/custom/typography';

const CardItemTitle = ({
  children,
  bookSlug,
}: {
  children: string;
  bookSlug: string;
}) => {
  return (
    <Link href={`/book/${bookSlug}`}>
      <TypographyH5 className="text-custom-button truncate w-full cursor-pointer">
        {children}
      </TypographyH5>
    </Link>
  );
};

export default CardItemTitle;
