import { Card } from '@/components/ui/card';
import { ShopCategoryImage } from '../../ui/custom/image';
import { TypographyH5, TypographyP } from '../../ui/custom/typography';

export function CategoryItem({
  imageSrc,
  title,
  bookCount,
}: {
  imageSrc: string;
  title: string;
  bookCount: string;
}) {
  return (
    <Card className="flex flex-col items-start w-full bg-transparent shadow-none md:w-[273px] sm:p-4 md:p-5  xl:w-[370px] p-6 gap-5 transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] cursor-pointer">
      <ShopCategoryImage src={imageSrc} />
      <div className="flex flex-col gap-2">
        <TypographyH5 className="text-custom-primary-text">
          {title}
        </TypographyH5>
        <TypographyP className="text-custom-primary-text">
          {bookCount}
        </TypographyP>
      </div>
    </Card>
  );
}
