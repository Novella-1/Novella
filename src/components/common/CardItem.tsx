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
    <Card className="flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-2xl border border-custom-border-color bg-[#FFF] sm:w-[272px] sm:h-[506px] sm:p-8">
      <BookImage />
      <div className="flex flex-col gap-2">
        <div>
          <TypographyH5 className="text-custom-primary">
            Fahrenheit 451
          </TypographyH5>
          <TypographyP className="text-custom-secondary">
            Ray Bradbury
          </TypographyP>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2">
            <TypographyH3>₴541</TypographyH3>
            <TypographyH4 className="text-custom-secondary line-through decoration-1">
              ₴600
            </TypographyH4>
          </div>
          <div className="flex flex-row gap-2">
            <VanIcon />
            <TypographyB className="text-custom-icons-accent">
              In stock
            </TypographyB>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between">
        <Button className="min-w-full h-10 cursor-pointer">Add to cart</Button>
        <AddToFavorite className="cursor-pointer" />
      </div>
    </Card>
  );
}
