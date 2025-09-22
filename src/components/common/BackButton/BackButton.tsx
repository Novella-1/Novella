'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className, ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <button
        onClick={() => {
          router.back();
        }}
        className="mb-4 flex items-center gap-1 pt-5 text-custom-primary-text"
      >
        <ChevronLeft />
        <span>Back</span>
      </button>
    </div>
  );
}
