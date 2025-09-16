import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { TruckIcon, HeadphonesIcon } from '../ui/custom/icons';
import { BookImage } from '../ui/custom/image';
import {
  TypographyB,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyP,
} from '../ui/custom/typography';
import { AddToFavorite } from './AddToFavorite';

export function CardItem() {
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     //logic
  //   };

  return (
    <Card className="flex flex-col items-start gap-4 w-[214px] h-[400px] p-5 rounded-2xl border border-custom-border-color bg-custom-card-bg sm:w-[272px] sm:h-[506px] sm:p-8">
      <div className="relative w-full flex justify-center">
        <BookImage />
        <div className="absolute flex items-center justify-center top-1 right-1 w-10 h-10 bg-custom-icons-accent rounded-full p-1">
          <HeadphonesIcon className="w-6 h-6 text-white " />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <TypographyH5 className="text-custom-primary">
            Fahrenheit 451
          </TypographyH5>
          <TypographyP className="text-custom-text-secondary">
            Ray Bradbury
          </TypographyP>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-2">
            <TypographyH3>₴541</TypographyH3>
            <TypographyH4 className="line-through decoration-1 text-custom-text-secondary">
              ₴600
            </TypographyH4>
          </div>
          <div className="flex flex-row gap-2">
            <TruckIcon className="w-5 h-5 text-custom-icons-accent" />
            <TypographyB className="text-custom-icons-accent">
              In stock
            </TypographyB>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-between w-full">
        <Button className="flex-1 h-10 cursor-pointer bg-custom-primary hover:bg-custom-hover-button">
          Add to cart
        </Button>
        <AddToFavorite className="cursor-pointer" />
      </div>
    </Card>
  );
}
