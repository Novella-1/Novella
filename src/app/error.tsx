'use client';

import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.error(error);
    const timer = setInterval(() => {
      setCount((count) => {
        if (count <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return count - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [error, router]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-custom-primary-bg p-6 text-center">
      <BookOpen className="h-24 w-24 text-[#8C6D5A] mb-6" />
      <h1 className="text-5xl font-bold text-[#5B4636] mb-2">Ooops.</h1>
      <p className="text-lg text-[#4A3421] mb-6">Error happened on server.</p>
      <button
        onClick={reset}
        className="mb-4 px-4 py-2 bg-[#8C6D5A] text-white rounded hover:bg-[#765444] transition"
      >
        Try again
      </button>
      <p className="text-sm text-[#5B4636]">
        Redirecting to the home page in {count} seconds.
      </p>
    </div>
  );
}
