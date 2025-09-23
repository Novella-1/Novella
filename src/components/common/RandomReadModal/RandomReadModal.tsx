'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
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
      const cover = `/books/${data.images[0]}`;

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
      setLoading(false);
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
      <DialogContent className="fixed top-1/2 left-1/2 z-[51] w-full h-[700px] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-custom-border bg-custom-modal p-0 shadow-xl overflow-hidden">
        <DialogHeader className="font-marcellus pt-6 px-6">
          <DialogTitle className="text-2xl text-center font-bold tracking-wide text-custom-bookmark-dash">
            Not sure what to read next?
          </DialogTitle>
          <DialogDescription className="mt-1 text-center text-custom-button-text text-base pb-4 border-b-1 ">
            Let fate decide! We’ll surprise you with a random book from our
            collection.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 flex flex-col items-center">
          <div
            className="flex flex-col items-center gap-4 justify-center"
            style={{ height: 360 }}
          >
            {loading && (
              <div className="flex justify-center items-center w-full h-full">
                <DotLottieReact
                  src="https://lottie.host/752e52c2-fcaa-47ff-99ed-0687fea87c59/WrJsDQktAl.lottie"
                  loop
                  autoplay
                  className="w-[150px] h-[200px]"
                />
              </div>
            )}

            {error && !loading && (
              <p className="text-center text-red-300">{error}</p>
            )}

            {book && !loading && !error && (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-[150px] h-[200px] flex-shrink-0"
                >
                  <Image
                    src={book.coverImage}
                    alt={book.title || 'Book cover'}
                    width={200}
                    height={200}
                    className="rounded-md shadow-lg object-cover border border-custom-border w-full h-full"
                  />
                </motion.div>

                <div className="text-center flex flex-col items-center">
                  <TypographyH3 className="text-lg font-semibold text-custom-primary-bg">
                    {book.title}
                  </TypographyH3>
                  <TypographyP className="text-white/70">
                    {book.author}
                  </TypographyP>
                  {book.categories && book.categories.length > 0 && (
                    <TypographyP className="mt-1 text-sm text-custom-primary-bg">
                      {book.categories.join(', ')}
                    </TypographyP>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="px-6 pb-6 flex flex-wrap justify-between items-center gap-2 w-full">
          <Button
            className="flex-1 font-bold text-custom-primary-text bg-custom-header-footer"
            onClick={fetchRandomBook}
          >
            Reroll
          </Button>

          {book && !error && (
            <Link
              href={`/book/${book.slug}`}
              className="flex-1"
            >
              <Button
                className="w-full flex-1 font-bold text-[#5C3B23] bg-yellow-400 hover:bg-yellow-300"
                onClick={onClose}
              >
                Get Book
              </Button>
            </Link>
          )}

          <DialogClose asChild>
            <Button className="flex-1 font-bold bg-[#5C3B23] text-white hover:bg-[#4a2f1a]">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
