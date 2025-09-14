import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-white text-[#89939A] py-6 w-full">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="flex items-center">
          <span className="font-semibold text-lg tracking-wider">
            Add logo soon
          </span>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex space-x-6"
        >
          <Link href="/github">
            <div className="hover:text-gray-500 transition-colors">GITHUB</div>
          </Link>
          <Link href="/contacts">
            <div className="hover:text-gray-500 transition-colors">
              CONTACTS
            </div>
          </Link>
          <Link href="/rights">
            <div className="hover:text-gray-500 transition-colors">RIGHTS</div>
          </Link>
        </nav>

        <Link href="#">
          <div
            className="flex items-center hover:opacity-75 transition-opacity"
            aria-label="Back to top"
          >
            Back to top
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
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
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
