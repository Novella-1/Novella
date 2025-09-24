'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Loading = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    document.body.style.overflow = 'hidden';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.body.style.overflow = '';
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center bg-custom-primary-bg',
          )}
        >
          <DotLottieReact
            src="https://lottie.host/752e52c2-fcaa-47ff-99ed-0687fea87c59/WrJsDQktAl.lottie"
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
