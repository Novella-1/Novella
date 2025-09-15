import { Card } from '@/components/ui/card';
import { ShopCatagoryImage } from '../ui/image';
import { TypographyH5, TypographyP } from '../ui/typography';

export function CatagoryItem() {
  return (
    <Card className="flex flex-col items-start w-[288px] h-[355px] border-0 shadow-none sm:w-[187px] sm:h-[263px] xl:w-[368px] xl:h-[365px] py-0 gap-6">
      <ShopCatagoryImage />
      <div className="flex flex-col ">
        <div className="flex flex-col gap-1">
          <TypographyH5 className="text-custom-primary text-[20px]">
            Paper books
          </TypographyH5>
          <TypographyP className="text-custom-secondary text-[14px]">
            10,305 books
          </TypographyP>
        </div>
      </div>
    </Card>
  );
}
