'use client';
import {
  Phone,
  Mail,
  MapPin,
  Facebook as FacebookIcon,
  Instagram,
  Linkedin,
} from 'lucide-react';

import Link from 'next/link';
import React, { FC, useState } from 'react';
import { LogoIcon } from '@/components/ui/custom/LogoIcon';
import { TypographyH3, TypographyP } from '@/components/ui/custom/typography';
import { RandomBookModal } from '../RandomReadModal/RandomReadModal';

const Footer: FC = () => {
  const [isRandomOpen, setRandomOpen] = useState(false);

  return (
    <>
      <footer className="bg-custom-header-footer font-bold py-10 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4 grid grid-cols-1 gap-10 md:px-20 xl:grid-cols-4">
          <div className="">
            <Link
              href="/"
              className="flex-shrink-0 items-start inline-block mb-4 text-left"
            >
              <LogoIcon className="h-14 cursor-pointer" />
            </Link>
            <TypographyP className="text-sm font-normal text-custom-icons leading-relaxed">
              Discover a world of stories with Novella, an online bookstore
              where literature lovers can find everything from timeless classics
              to modern bestsellers. Whether you&apos;re searching for
              captivating novels, thought-provoking non-fiction, or inspiring
              works from new authors, Novella makes it easy to explore, choose,
              and enjoy your next read.
            </TypographyP>
          </div>

          <div className="flex flex-col items-start sm:items-start md:items-start xl:items-start text-left">
            <TypographyH3 className="mb-4 text-xl text-custom-primary-text">
              Navigation
            </TypographyH3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/paper"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  PAPER
                </Link>
              </li>
              <li>
                <Link
                  href="/kindle"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  KINDLE
                </Link>
              </li>
              <li>
                <Link
                  href="/audiobook"
                  className="text-custom-icons hover:text-custom-text-hover  transition-colors"
                >
                  AUDIOBOOK
                </Link>
              </li>
            </ul>
          </div>

          {/* 3 колонка: Контакти */}
          <div className="flex flex-col items-start md:items-start xl:items-start text-left">
            <TypographyH3 className="mb-4 text-xl text-custom-primary-text">
              Contacts
            </TypographyH3>
            <ul className="space-y-3 text-sm font-normal text-primary-text">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-custom-icons" />
                <a
                  href="tel:+15551234567"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2 ">
                <Mail className="w-4 h-4 text-custom-icons" />
                <a
                  href="mailto:contact@novella.com"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  contact@novella.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-custom-icons" />
                <a
                  href="https://www.google.com/maps?q=123+Book+Street,+Literature+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-custom-icons hover:text-custom-text-hover transition-colors"
                >
                  123 Book Street, Literature City
                </a>
              </li>
            </ul>
          </div>

          {/* 4 колонка: Соцмережі */}
          <div className="flex flex-col items-start md:items-start">
            <TypographyH3 className="mb-4 text-xl text-custom-primary-text">
              Follow us
            </TypographyH3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/book.ua/?locale=uk_UA"
                aria-label="Facebook"
                className="opacity-75 text-custom-icons hover:text-custom-text-hover transition"
                target="_blank"
              >
                <FacebookIcon size={28} />
              </a>
              <a
                href="https://linkedin.com/company/bookshop_org"
                aria-label="Linkedin"
                className="opacity-75 text-custom-icons hover:text-custom-text-hover transition"
                target="_blank"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://www.instagram.com/bookshop_org/"
                aria-label="Instagram"
                className="opacity-75 text-custom-icons hover:text-custom-text-hover transition"
                target="_blank"
              >
                <Instagram size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-custom-icons hover:text-custom-text-hover transition-opacity bg-transparent font-bold cursor-pointer"
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

      <RandomBookModal
        open={isRandomOpen}
        onClose={() => setRandomOpen(false)}
      />
    </>
  );
};

export default Footer;
