'use client';
import Image from 'next/image';
import Link from 'next/link';

import React, { FC } from 'react';

const Footer: FC = () => {
  const smoothScrollToTop = () => {
    // 1) Если у тебя есть элемент с id="top" (рекомендуется добавить в layout), используем его:
    const topEl = document.getElementById('top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 2) Попытка нативного smooth (современные браузеры)
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } catch (err) {}

    const start = window.scrollY || window.pageYOffset;
    const duration = 500;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 0.5 - Math.cos(Math.PI * t) / 2;
      window.scrollTo(0, Math.round(start * (1 - eased)));
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <footer className="bg-white text-[#BAA48C] font-bold py-6 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="NOVELLA"
              width={120}
              height={40}
              className="cursor-pointer hidden sm:block h-10 w-auto xl:h-14"
            />
            <Image
              src="/images/logo.png"
              alt="NOVELLA"
              width={120}
              height={40}
              className="cursor-pointer sm:hidden h-10 w-auto xl:h-14"
            />
          </Link>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex space-x-6 md:space-x-28"
        >
          <Link href="/github">
            <div className="hover:text-[#331F06] transition-colors">GITHUB</div>
          </Link>
          <Link href="/contacts">
            <div className="hover:text-[#331F06] transition-colors">
              CONTACTS
            </div>
          </Link>
          <Link href="/rights">
            <div className="hover:text-[#331F06] transition-colors">RIGHTS</div>
          </Link>
        </nav>

        <button
          type="button"
          onClick={smoothScrollToTop}
          className="flex items-center hover:opacity-75 transition-opacity hover:text-[#331F06] bg-transparent hover:cursor-pointer font-bold"
          aria-label="Back to top"
        >
          Back to top
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
