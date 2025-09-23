'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchBarSkeletonProps {
  variant: 'desktop' | 'mobile';
}

export const SearchBarSkeleton: React.FC<SearchBarSkeletonProps> = ({
  variant,
}) => {
  const count = variant === 'mobile' ? 3 : 4;

  return (
    <motion.div
      key="skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={
        variant === 'mobile' ?
          'absolute top-full mt-2 w-full max-w-2xl bg-custom-secondary border border-custom-main-elements rounded-md shadow-lg z-50 p-4 scrollbar-hide'
        : 'absolute top-full left-1/2 mt-4 bg-custom-secondary rounded-xl z-50 p-6 max-h-[290px] overflow-y-auto custom-scrollbar shadow-lg w-[480px] -translate-x-1/2 scrollbar-hide'
      }
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`flex ${
            variant === 'mobile' ?
              'items-center space-x-4 mb-3'
            : 'items-center justify-between space-x-6 mb-4'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Skeleton
              className={
                variant === 'mobile' ? 'w-16 h-20 rounded' : (
                  'w-20 h-[100px] rounded-lg'
                )
              }
            />
            <div className="flex flex-col space-y-2">
              <Skeleton
                className={variant === 'mobile' ? 'h-4 w-32' : 'h-5 w-40'}
              />
              <Skeleton
                className={variant === 'mobile' ? 'h-3 w-20' : 'h-4 w-28'}
              />
            </div>
          </div>
          {variant !== 'mobile' && <Skeleton className="h-6 w-16" />}
        </div>
      ))}
    </motion.div>
  );
};
