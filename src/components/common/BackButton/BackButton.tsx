'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-4 flex items-center gap-1 p-0"
      >
        <ChevronLeft />
        <span>Back</span>
      </button>
    </div>
  );
};
