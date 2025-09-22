'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
export const VideoPlayer = ({ className }: { className?: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);
  return (
    <div
      className={cn(
        'w-full h-[400px] xl:h-156 overflow-hidden pt-10',
        className,
      )}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover brightness-50"
        poster="/hero-cover.png"
        ref={videoRef}
      >
        <source
          src="/videos/Novella-video.mp4"
          type="video/mp4"
        />
        Ваш браузер не підтримує відео.
      </video>
    </div>
  );
};
