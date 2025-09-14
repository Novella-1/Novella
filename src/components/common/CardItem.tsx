import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { BookImage, VanIcon } from '../ui/image';
import {
  TypographyB,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyP,
} from '../ui/typography';
import { AddToFavorite } from './AddToFavorite';

export function CardItem() {
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     //logic
  //   };

  return (
    <Card className="flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-[16px] border border-[#E2E6E9] bg-[#FFF] sm:w-[272px] sm:h-[506px] sm:p-8">
      <BookImage />
      <div className="flex flex-col gap-2">
        <div>
          <TypographyH5 className="text-primary-color">
            Fahrenheit 451
          </TypographyH5>
          <TypographyP className="text-gray-secondary">
            Ray Bradbury
          </TypographyP>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2">
            <TypographyH3>₴541</TypographyH3>
            <TypographyH4 className="text-gray-secondary">₴600</TypographyH4>
          </div>
          <div className="flex flex-row gap-2">
            <VanIcon />
            <TypographyB className="text-icons-accent-color">
              In stock
            </TypographyB>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <Button className="min-w-full h-10">Add to cart</Button>
        <AddToFavorite />
      </div>
    </Card>
  );
}
