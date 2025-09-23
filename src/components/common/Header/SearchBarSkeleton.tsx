'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  mobileFull?: boolean;
}

export default function SearchBarSkeleton({ mobileFull = false }: Props) {
  const count = mobileFull ? 3 : 4;

  const base =
    'absolute top-full mt-2 bg-custom-secondary rounded-xl z-50 p-6 overflow-y-auto custom-scrollbar shadow-lg';
  const desktop = 'w-[480px] -translate-x-1/2 left-1/2 max-h-[290px]';
  const mobile =
    'left-0 right-0 mx-auto w-full max-w-2xl bg-custom-secondary border border-custom-main-elements rounded-md p-4';

  const wrapperClass = cn(base, mobileFull ? mobile : desktop);

  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={wrapperClass}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`flex ${mobileFull ? 'items-center space-x-4 mb-3' : 'items-center justify-between space-x-6 mb-4'}`}
        >
          <div className="flex items-center space-x-4">
            <Skeleton
              className={
                mobileFull ? 'w-16 h-20 rounded' : 'w-20 h-[100px] rounded-lg'
              }
            />
            <div className="flex flex-col space-y-2">
              <Skeleton className={mobileFull ? 'h-4 w-32' : 'h-5 w-40'} />
              <Skeleton className={mobileFull ? 'h-3 w-20' : 'h-4 w-28'} />
            </div>
          </div>

          {!mobileFull && <Skeleton className="h-6 w-16" />}
        </div>
      ))}
    </motion.div>
  );
}
