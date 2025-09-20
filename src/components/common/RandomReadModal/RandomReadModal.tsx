'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
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
      setError('Не удалось загрузить книгу. Попробуйте ещё раз.');
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
      <DialogContent className="fixed top-1/2 left-1/2 z-[51] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-[#958370] bg-[#6C563D] p-0 text-white shadow-xl overflow-hidden">
        <div className="bg-[#5A4632] px-6 py-5 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-wide">
              Not sure what to read next?
            </DialogTitle>
            <DialogDescription className="mt-1 text-white/80 text-base">
              Let fate decide! We’ll surprise you with a random book from our
              collection.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 flex flex-col items-center">
          <div
            className="flex flex-col items-center gap-4 justify-center"
            style={{ minHeight: 360 }}
          >
            {loading && (
              <div className="flex justify-center items-center w-full h-full">
                <DotLottieReact
                  src="https://lottie.host/752e52c2-fcaa-47ff-99ed-0687fea87c59/WrJsDQktAl.lottie"
                  loop
                  autoplay
                  style={{ width: 150, height: 150 }}
                />
              </div>
            )}

            {error && !loading && (
              <p className="text-center text-red-300">{error}</p>
            )}

            {book && !loading && !error && (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex flex-col items-center gap-4"
              >
                <Image
                  src={book.coverImage}
                  alt={book.title || 'Book cover'}
                  width={180}
                  height={260}
                  className="rounded-md shadow-lg object-cover border border-[#958370]"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-white/70">{book.author}</p>
                  {book.categories && book.categories.length > 0 && (
                    <p className="mt-1 text-sm text-yellow-300">
                      {book.categories.join(', ')}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-2 w-full">
            <Button
              className="flex-1 font-bold text-[#8B5E3C] bg-white hover:bg-gray-200"
              onClick={fetchRandomBook}
            >
              Reroll
            </Button>

            {book && !error && (
              <Link
                href={`/books/${book.slug}`}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
