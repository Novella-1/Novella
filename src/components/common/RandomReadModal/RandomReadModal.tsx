'use client';

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
  DialogOverlay,
} from '@/components/ui/dialog';

interface RandomBookModalProps {
  open: boolean;
  onClose: () => void;
}

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: '/images/books/gatsby.jpg',
    url: '/books/gatsby',
  },
  {
    title: '1984',
    author: 'George Orwell',
    cover: '/images/books/1984.jpg',
    url: '/books/1984',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: '/images/books/mockingbird.jpg',
    url: '/books/mockingbird',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    cover: '/images/books/mobydick.jpg',
    url: '/books/mobydick',
  },
];

export const RandomBookModal: React.FC<RandomBookModalProps> = ({
  open,
  onClose,
}) => {
  const [book, setBook] = React.useState(books[0]);

  React.useEffect(() => {
    if (open) {
      const random = books[Math.floor(Math.random() * books.length)];
      setBook(random);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      {/* Оверлей */}
      <DialogOverlay
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          inset: 0,
          zIndex: 50,
        }}
      />

      <DialogContent
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#6C563D',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          zIndex: 51,
          border: '2px solid #958370',
        }}
      >
        {/* Убираем крестик */}
        <style>{`
          [data-radix-dialog-close] {
            display: none !important;
          }
          @keyframes bookFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(10px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(0);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>

        <DialogHeader>
          <DialogTitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Not sure what to read next?
          </DialogTitle>
          <DialogDescription style={{ color: 'rgba(255,255,255,0.8)' }}>
            With one click, we’ll surprise you with a random book from our
            collection. Discover hidden gems and step into a new story today.
          </DialogDescription>
        </DialogHeader>

        <div
          key={book.title} // чтобы анимация срабатывала при смене книги
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginTop: '16px',
            animation: 'bookFadeIn 0.6s ease forwards',
          }}
        >
          <Image
            src={book.cover}
            alt={book.title}
            width={160}
            height={240}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              {book.title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{book.author}</p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            style={{
              backgroundColor: 'white',
              color: '#8B5E3C',
              fontWeight: 'bold',
              flex: '1',
            }}
            onClick={() => {
              const random = books[Math.floor(Math.random() * books.length)];
              setBook(random);
            }}
          >
            Reroll
          </Button>

          <Link
            href={book.url}
            style={{ flex: '1' }}
          >
            <Button
              style={{
                backgroundColor: '#FFD700',
                color: '#5C3B23',
                fontWeight: 'bold',
                width: '100%',
              }}
              onClick={onClose}
            >
              Get Book
            </Button>
          </Link>

          <DialogClose asChild>
            <Button
              style={{
                backgroundColor: '#5C3B23',
                color: 'white',
                fontWeight: 'bold',
                flex: '1',
              }}
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
