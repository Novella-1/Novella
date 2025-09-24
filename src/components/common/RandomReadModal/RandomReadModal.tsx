'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TypographyH3, TypographyP } from '@/components/ui/custom/typography';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

interface RandomBookModalProps {
  open: boolean;
  onClose: () => void;
}

interface Book {
  title: string;
  author: string;
  slug: string;
  coverImage: string;
  categories?: string[];
}

export const RandomBookModal: React.FC<RandomBookModalProps> = ({
  open,
  onClose,
}) => {
  const [book, setBook] = React.useState<Book | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRandomBook = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/random`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const cover = `/books/${data.images?.[0] || 'placeholder.jpg'}`;

      setBook({
        title: data.name,
        author: data.author,
        slug: data.slug,
        coverImage: cover,
        categories: data.categories || [],
      });
    } catch (err) {
      console.error('Error fetching book:', err);
      setError('Failed to download the book. Try again.');
      setBook(null);
    } finally {
      setTimeout(() => setLoading(false), 80);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchRandomBook();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent
        className="
          fixed top-1/2 left-1/2 z-[51] -translate-x-1/2 -translate-y-1/2
          rounded-xl border-2 border-custom-border bg-custom-modal shadow-xl
          w-[88vw] max-w-[360px] md:w-auto md:max-w-md
          max-h-[68vh] md:max-h-[92vh]
          p-0 overflow-hidden flex flex-col
        "
      >
        <DialogHeader className="font-marcellus pt-4 px-4 md:pt-6 md:px-6 flex-none">
          <DialogTitle className="text-lg md:text-2xl text-center font-bold tracking-wide text-custom-bookmark-dash">
            Not sure what to read next?
          </DialogTitle>
          <DialogDescription className="mt-1 text-center text-custom-button-text text-sm md:text-base pb-3 md:pb-4">
            Let fate decide! We’ll surprise you with a random book from our
            collection.
          </DialogDescription>
        </DialogHeader>

        <div
          className="px-4 md:px-6 flex-1 relative md:overflow-auto overflow-hidden"
          style={
            {
              WebkitOverflowScrolling: 'touch',
              scrollbarGutter: 'stable',
            } as React.CSSProperties
          }
        >
          <div
            className="w-full flex items-start md:items-center justify-center"
            style={{ height: 320 }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 220,
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait">
                {loading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 flex flex-col items-center justify-start gap-3"
                    style={{
                      paddingTop: 14,
                      paddingLeft: 6,
                      paddingRight: 6,
                      overflow: 'hidden',
                    }}
                  >
                    <div className="w-[100px] h-[135px] md:w-[130px] md:h-[175px] flex-none overflow-hidden">
                      <DotLottieReact
                        src="https://lottie.host/84c28cf2-5862-494b-84d2-da3bb078e01e/ILSfTM9AiG.lottie"
                        loop
                        autoplay
                        className="w-full h-full"
                        style={{ background: 'transparent' }}
                      />
                    </div>

                    <div className="text-center w-[80%] h-[56px] flex flex-col justify-center">
                      <div className="w-full h-3 rounded bg-white/10" />
                      <div className="w-1/2 h-2 rounded bg-white/6 mt-2 mx-auto" />
                    </div>
                  </motion.div>
                )}

                {!loading && error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 flex flex-col items-center justify-start gap-3 px-2"
                    style={{ paddingTop: 14, overflow: 'hidden' }}
                  >
                    <div className="w-[100px] h-[135px] md:w-[130px] md:h-[175px] bg-custom-border rounded-md flex-none" />
                    <p className="text-center text-red-300 text-sm md:text-base px-2">
                      {error}
                    </p>
                  </motion.div>
                )}

                {!loading && book && (
                  <motion.div
                    key={book.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 flex flex-col items-center justify-start gap-3 px-2"
                    style={{ paddingTop: 14, overflow: 'hidden' }}
                  >
                    <div
                      className="w-[100px] h-[135px] md:w-[130px] md:h-[175px] flex-none"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title || 'Book cover'}
                        width={130}
                        height={175}
                        sizes="(max-width: 640px) 100px, 130px"
                        className="rounded-md shadow-lg object-contain border border-custom-border"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          display: 'block',
                        }}
                        priority={false}
                      />
                    </div>

                    <div className="text-center flex flex-col items-center px-2">
                      <TypographyH3 className="text-sm md:text-lg font-semibold text-custom-primary-bg leading-tight">
                        {book.title}
                      </TypographyH3>
                      <TypographyP className="text-white/70 text-xs md:text-sm truncate w-full">
                        {book.author}
                      </TypographyP>
                      {book.categories && book.categories.length > 0 && (
                        <TypographyP className="mt-1 text-xs md:text-sm text-custom-primary-bg line-clamp-1 w-full">
                          {book.categories.join(', ')}
                        </TypographyP>
                      )}
                    </div>
                  </motion.div>
                )}

                {!loading && !book && !error && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 flex flex-col items-center justify-start gap-3"
                    style={{ paddingTop: 14, overflow: 'hidden' }}
                  >
                    <div className="w-[100px] h-[135px] md:w-[130px] md:h-[175px] bg-custom-border rounded-md" />
                    <div className="text-center w-[80%] h-[56px] flex flex-col justify-center">
                      <div className="w-full h-3 rounded bg-white/10" />
                      <div className="w-1/2 h-2 rounded bg-white/6 mt-2 mx-auto" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-4 pt-3 flex flex-col sm:flex-row gap-2 w-full flex-none">
          <Button
            className="w-full sm:w-auto flex-1 font-bold bg-[#5C3B23] text-white hover:bg-[#4a2f1a]"
            onClick={fetchRandomBook}
            aria-disabled={loading}
          >
            Reroll
          </Button>

          {book && !error && (
            <Link
              href={`/book/${book.slug}`}
              className="w-full sm:w-auto flex-1"
            >
              <Button
                className="w-full font-bold text-[#5C3B23] bg-yellow-400 hover:bg-yellow-300"
                onClick={onClose}
              >
                Get Book
              </Button>
            </Link>
          )}

          <DialogClose asChild>
            <Button className="w-full sm:w-auto font-bold bg-[#5C3B23] text-white hover:bg-[#4a2f1a]">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
