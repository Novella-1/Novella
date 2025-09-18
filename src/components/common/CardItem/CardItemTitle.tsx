'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TypographyH5 } from '@/components/ui/custom/typography';

const CardItemTitle = ({
  children,
  bookSlug,
}: {
  children: string;
  bookSlug: string;
}) => {
  const router = useRouter();

  const onTitleClickHandler = () => {
    router.push(`/book/${bookSlug}`);
  };
  return (
    <button
      type="button"
      onClick={onTitleClickHandler}
      className="w-full text-left bg-transparent border-none p-0 cursor-pointer"
      aria-label={`View details for ${children}`}
    >
      <TypographyH5 className="text-custom-button truncate w-full cursor-pointer">
        {children}
      </TypographyH5>
    </button>
  );
};

export default CardItemTitle;
