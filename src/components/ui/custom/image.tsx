import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function BookImage({
  src,
  namespaceId,
  lang,
}: {
  src: string;
  namespaceId: string;
  lang: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center self-stretch px-0 sm:px-[13.844px] cursor-pointer',
      )}
    >
      <Link href={`/book/${namespaceId}/${lang}`}>
        <Image
          src={src}
          alt="Book cover"
          width={146}
          height={186}
          className="w-[146px] h-[186px] sm:w-[208px] sm:h-[263px] object-cover rounded-md"
        />
      </Link>
    </div>
  );
}

export function ShopCategoryImage({ src }: { src: string }) {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt="Shop category"
        fill
        className="object-cover"
      />
    </div>
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
