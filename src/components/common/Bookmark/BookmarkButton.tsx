'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

interface BookmarkButtonProps {
  className?: string;
  onClick?: () => void;
}

const BookmarkButton = ({ className, onClick }: BookmarkButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const clipPath = 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)';

  return (
    <motion.div
      initial={{ height: 88 }}
      whileHover={{ height: 160 }}
      transition={{ type: 'tween', duration: 0.18 }}
      style={{
        clipPath,
        WebkitClipPath: clipPath,
      }}
      onClick={onClick}
      className={`fixed top-12 right-4 xl:top-16 xl:right-18 w-[46px] h-[88px] xl:w-[60px] xl:h-[136px] bg-custom-bookmark text-custom-bookmark-dash cursor-pointer 
         flex items-start justify-center font-bold overflow-visible z-50 ${className ?? ''}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '6% 0 28% 0',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 8,
            paddingInline: 6,
            textAlign: 'center',
            pointerEvents: 'auto',
          }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="bookmark-text"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={{ lineHeight: 1.05, fontSize: 14, fontFamily: 'Martel' }}
              >
                Click here to get the book!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <svg
          viewBox="0 0 100 120"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <path
            d="M5 5 L5 95 L50 75 L95 95 L95 5"
            fill="none"
            stroke="var(--bookmark-dash)"
            strokeWidth={1.4}
            strokeDasharray="10 6"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default BookmarkButton;
