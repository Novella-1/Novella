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
    <Card className="flex flex-col items-start w-[288px] h-[355px] border-0 shadow-none sm:w-[187px] sm:h-[263px] xl:w-[368px] xl:h-[365px] py-0 gap-4 ">
      <ShopCategoryImage src={imageSrc} />
      <div className="flex flex-col gap-1">
        <TypographyH5 className="text-custom-primary text-[20px]">
          {title}
        </TypographyH5>
        <TypographyP className="text-custom-secondary text-[14px]">
          {bookCount}
        </TypographyP>
      </div>
    </Card>
  );
}
