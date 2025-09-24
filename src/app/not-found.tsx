'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-primary text-custom-header-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Image
          src="/images/404-book.png"
          alt="Page Not Found"
          width={300}
          height={300}
          className="rounded-lg shadow-2xl shadow-[#794f3b]"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl font-bold mb-4 text-center text-custom-primary-text"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-center max-w-md text-custom-primary-text"
      >
        It seems that this page has been lost among the endless shelves of our
        library.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="px-6 py-3 bg-custom-primary-text hover:bg-custom-favourites-icon text-custom-header-footer font-semibold rounded-lg shadow-md transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
