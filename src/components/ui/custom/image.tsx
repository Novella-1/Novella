import Image from 'next/image';
import { cn } from '@/lib/utils';

// interface BookImageProps {
//   className?: string;
// }

export function BookImage() {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center self-stretch px-0 sm:px-[13.844px]',
      )}
    >
      <Image
        src="/book-cover.png"
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
interface DetailImageProps {
  className?: string;
}

export function DetailImage({ className, ...props }: DetailImageProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    ></div>
  );
}
