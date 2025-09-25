import Link from 'next/link';
import React from 'react';
import { TypographyH5 } from '@/components/ui/custom/typography';

const CardItemTitle = ({
  children,
  lang,
  namespaceId,
  type,
}: {
  children: string;
  namespaceId: string;
  lang: string;
  type: string;
}) => {
  return (
    <Link href={`/book/${namespaceId}/${lang}?type=${type}`}>
      <TypographyH5 className="truncate w-full cursor-pointer">
        {children}
      </TypographyH5>
    </Link>
  );
};

export default CardItemTitle;
