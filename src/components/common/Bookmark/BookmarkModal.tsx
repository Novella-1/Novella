'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RandomBookModal } from '../RandomReadModal/RandomReadModal';
import BookmarkButton from './BookmarkButton';

interface BookMarkModalProps {
  className?: string;
}

export function BookMarkModal({ className, ...props }: BookMarkModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={cn(className)}>
      <BookmarkButton onClick={() => setModalOpen(true)} />

      <RandomBookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
