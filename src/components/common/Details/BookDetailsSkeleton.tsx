'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function BookDetailsSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(className, 'pt-32 pb-16')}
    >
      <div className="mb-8">
        <Skeleton className="h-8 w-64 rounded bg-[#8B5E3C]/40 mb-2" />
        <Skeleton className="h-5 w-40 rounded bg-[#A97454]/40" />
      </div>

      <div className="flex flex-col gap-4 sm:gap-[34px] xl:flex-row xl:gap-[88px] xl:h-[524px] xl:items-start mb-8">
        <div className="flex flex-col-reverse gap-4 sm:flex-row xl:h-full xl:items-stretch">
          <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:overflow-x-visible">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 rounded bg-[#8B5E3C]/40"
              />
            ))}
          </div>
          <Skeleton className="w-full h-[424px] xl:w-[464px] xl:h-[520px] rounded-[14px] sm:rounded-[16px] xl:rounded-[20px] bg-[#8B5E3C]/40" />
        </div>

        <div className="flex flex-col gap-4 w-full xl:h-full bg-custom-header-footer border border-custom-border rounded-[14px] sm:rounded-[20px] p-4 sm:p-6 xl:p-8">
          <Skeleton className="h-5 w-24 rounded bg-[#A97454]/40" />
          <Skeleton className="h-8 w-32 rounded bg-[#C28E6A]/40" />
          <Skeleton className="h-[1px] w-full bg-[#8B5E3C]/40" />
          <Skeleton className="h-5 w-32 rounded bg-[#A97454]/40" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-12 rounded bg-[#B78B65]/40" />
            <Skeleton className="h-9 w-12 rounded bg-[#B78B65]/40" />
          </div>
          <Skeleton className="h-[1px] w-full bg-[#8B5E3C]/40" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-8 w-20 rounded bg-[#A97454]/40" />
            <Skeleton className="h-6 w-16 rounded bg-[#C28E6A]/40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 flex-1 rounded bg-[#B78B65]/40" />
            <Skeleton className="h-10 w-10 rounded bg-[#B78B65]/40" />
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded bg-[#A97454]/40" />
                <Skeleton className="h-4 w-24 rounded bg-[#C28E6A]/40" />
              </div>
              <Skeleton className="h-[1px] w-full bg-[#8B5E3C]/40 mt-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:divide-x xl:divide-[#8B5E3C]/40 mb-20">
        <div className="flex flex-col items-start gap-4 w-full xl:w-1/2 px-0 xl:px-10 xl:max-w-[560px]">
          <Skeleton className="h-6 w-32 rounded bg-[#A97454]/40" />
          <Skeleton className="h-[1px] w-4/5 bg-[#8B5E3C]/40" />
          <Skeleton className="h-5 w-4/5 rounded bg-[#B78B65]/40" />
          <Skeleton className="h-5 w-4/5 rounded bg-[#B78B65]/40" />
          <Skeleton className="h-5 w-3/5 rounded bg-[#B78B65]/40" />
        </div>

        <div className="flex flex-col items-start gap-4 w-full xl:w-1/2 px-0 xl:px-10 xl:flex-1">
          <Skeleton className="h-6 w-40 rounded bg-[#A97454]/40" />
          <Skeleton className="h-[1px] w-4/5 bg-[#8B5E3C]/40" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between w-4/5"
            >
              <Skeleton className="h-5 w-40 rounded bg-[#A97454]/40" />
              <Skeleton className="h-5 w-32 rounded bg-[#C28E6A]/40" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-7 w-48 rounded bg-[#A97454]/40 mb-6" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-64 w-40 rounded bg-[#8B5E3C]/40 flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
