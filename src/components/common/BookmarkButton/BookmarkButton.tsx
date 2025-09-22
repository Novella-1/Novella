'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import React, { useState } from 'react';

interface BookmarkButtonProps {
  className?: string;
}

const BookmarkButton = ({ className }: BookmarkButtonProps) => {
  return (
    <>
      <motion.div
        initial={{ width: '5.5rem' }}
        whileHover={{ width: '10rem' }}
        transition={{ type: 'tween', duration: 0.1 }}
        className="
    fixed top-1/3 right-0
    h-20
    bg-red-600 text-white
    cursor-pointer
    flex items-center justify-center
    font-bold
    transition-all
    clip-path-bookmark-horizontal-left
    overflow-hidden
    z-50
  "
      ></motion.div>
    </>
  );
};

export default BookmarkButton;
