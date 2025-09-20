'use client';
import {
  Phone,
  Mail,
  MapPin,
  Facebook as FacebookIcon,
  Instagram,
  Linkedin,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { TypographyH3, TypographyP } from '@/components/ui/custom/typography';
import { RandomBookModal } from '../RandomReadModal/RandomReadModal';

const Footer: FC = () => {
  const [isRandomOpen, setRandomOpen] = useState(false);

  const smoothScrollToTop = () => {
    // const topEl = document.getElementById('top');
    // if (topEl) {
    //   topEl.scrollIntoView({ behavior: 'smooth' });
    //   return;
    // }

    // try {

    //   return;
    // } catch {}

    // const start = window.scrollY || window.pageYOffset;
    // const duration = 500;
    // const startTime = performance.now();

    // const step = (now: number) => {
    //   const elapsed = now - startTime;
    //   const t = Math.min(elapsed / duration, 1);
    //   const eased = 0.5 - Math.cos(Math.PI * t) / 2;
    //   window.scrollTo(0, Math.round(start * (1 - eased)));
    //   if (t < 1) requestAnimationFrame(step);
    // };

    // requestAnimationFrame(step);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white text-[#BAA48C] font-bold py-10 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 1 колонка: Логотип + опис */}
          <div>
            <Link
              href="/"
              className="flex-shrink-0 inline-block mb-4"
            >
              <Image
                src="/images/logo.png"
                alt="NOVELLA"
                width={120}
                height={40}
                className="cursor-pointer h-10 w-auto xl:h-14"
              />
            </Link>
            <TypographyP className="text-sm font-normal text-[#5A4632] leading-relaxed">
              Discover a world of stories with Novella, an online bookstore
              where literature lovers can find everything from timeless classics
              to modern bestsellers. Whether you&apos;re searching for
              captivating novels, thought-provoking non-fiction, or inspiring
              works from new authors, Novella makes it easy to explore, choose,
              and enjoy your next read.
            </TypographyP>
          </div>

          {/* 2 колонка: Навигация */}
          <div className="flex flex-col items-start sm:items-start md:items-center lg:items-center text-left">
            <TypographyH3 className="mb-4 text-lg text-[#331F06]">
              Navigation
            </TypographyH3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#331F06] transition-colors"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/paper"
                  className="hover:text-[#331F06] transition-colors"
                >
                  PAPER
                </Link>
              </li>
              <li>
                <Link
                  href="/kindle"
                  className="hover:text-[#331F06] transition-colors"
                >
                  KINDLE
                </Link>
              </li>
              <li>
                <Link
                  href="/audiobook"
                  className="hover:text-[#331F06] transition-colors"
                >
                  AUDIOBOOK
                </Link>
              </li>
            </ul>
          </div>

          {/* 3 колонка: Контакти */}
          <div className="flex flex-col items-start sm:items-start md:items-start lg:items-start text-left">
            <TypographyH3 className="mb-4 text-lg text-[#331F06]">
              Contacts
            </TypographyH3>
            <ul className="space-y-3 text-sm font-normal text-[#5A4632]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> contact@novella.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 123 Book Street, Literature City
              </li>
            </ul>
          </div>

          {/* 4 колонка: Соцмережі */}
          <div className="flex flex-col items-start sm:items-start md:items-start lg:items-start">
            <TypographyH3 className="mb-4 text-lg text-[#331F06]">
              Follow us
            </TypographyH3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/book.ua/?locale=uk_UA"
                aria-label="Facebook"
                className="hover:opacity-75 transition"
                target="_blank"
              >
                <FacebookIcon size={28} />
              </a>
              <a
                href="https://linkedin.com/company/bookshop_org"
                aria-label="Linkedin"
                className="hover:opacity-75 transition"
                target="_blank"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://www.instagram.com/bookshop_org/"
                aria-label="Instagram"
                className="hover:opacity-75 transition"
                target="_blank"
              >
                <Instagram size={28} />
              </a>
            </div>

            {/* Кнопка открытия RandomBookModal */}
            <button
              type="button"
              onClick={() => setRandomOpen(true)}
              className="px-4 py-2 bg-[#5A4632] text-white rounded-md font-bold hover:bg-[#4a3826] transition"
            >
              Let Fate Decide 📚
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-10 flex justify-center">
          <button
            type="button"
            onClick={smoothScrollToTop}
            className="flex items-center hover:opacity-75 transition-opacity hover:text-[#331F06] bg-transparent font-bold"
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
            <RandomBookModal
              open={isRandomOpen}
              onClose={() => setRandomOpen(false)}
            />
          </button>
        </div>
      </footer>

      {/* Модалка */}
    </>
  );
};

export default Footer;
