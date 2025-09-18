'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BookImage({
  src,
  bookSlug,
}: {
  src: string;
  bookSlug: string;
}) {
  const router = useRouter();

  const obImageClickHandler = () => {
    router.push(`/book/${bookSlug}`);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={obImageClickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          obImageClickHandler();
        }
      }}
      className={cn(
        'flex flex-col justify-center items-center self-stretch px-0 sm:px-[13.844px] cursor-pointer',
      )}
    >
      <Image
        src={src}
        alt="Book cover"
        width={208}
        height={264}
        className="w-[146px] h-[185px] sm:w-[208px] sm:h-[263px] object-cover rounded-md"
      />
    </div>
  );
}

export function ShopCategoryImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Shop category"
      width={368}
      height={289}
      className="w-full h-[288px] sm:h-[187px] xl:h-[289px] object-cover rounded-md"
    />
  );
}

interface ImageCoverProps {
  className?: string;
}

export function HomePageImage({ className }: ImageCoverProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <Image
        src="/homePage-cover.png"
        alt="Home page cover"
        width={1044}
        height={400}
        className="w-[1042px] h-[320px] sm:h-[400px] rounded-md object-cover"
      />
    </div>
  );
}
