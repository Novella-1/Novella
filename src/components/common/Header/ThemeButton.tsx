'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Droplet, Contrast } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const themeOptions = [
  {
    value: 'light',
    label: 'Light',
    icon: <Sun className="!h-6 !w-6 text-yellow-500" />,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <Moon className="!h-6 !w-6 text-black" />,
  },
  {
    value: 'protanopia',
    label: 'Protanopia',
    icon: <Droplet className="!h-6 !w-6 text-rose-500" />,
  },
  {
    value: 'deuteranopia',
    label: 'Deuteranopia',
    icon: <Droplet className="!h-6 !w-6 text-green-500" />,
  },
  {
    value: 'tritanopia',
    label: 'Tritanopia',
    icon: <Droplet className="!h-6 !w-6 text-sky-500" />,
  },
  {
    value: 'grayscale',
    label: 'Grayscale',
    icon: <Contrast className="!h-6 !w-6 text-gray-500" />,
  },
];

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current =
    themeOptions.find((opt) => opt.value === resolvedTheme) ?? themeOptions[0];

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="border-none"
        aria-label="Select theme"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none"
          aria-label="Select theme"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={current.value}
              initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {current.icon}
            </motion.div>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themeOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setTheme(opt.value)}
          >
            <span className="mr-2">{opt.icon}</span>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
