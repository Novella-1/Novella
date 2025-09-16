import { Separator } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { ImageContainer } from '@/components/ui/custom/imageContainer';
import {
  TypographyB,
  TypographyH2,
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';
import { AddToFavorite } from '../AddToFavorite';

interface BookInfoProps {
  className?: string;
}

export function BookInfo({ className, ...props }: BookInfoProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <ImageContainer className="flex gap-4 flex-col w-full rounded-[14px] sm:w-full sm:rounded-[20px] xl:w-[380px] xl:h-full py-4 px-3 sm:py-6 sm:px-12 xl:py-7 xl:px-8 bg-custom-header-bg border-1 border-custom-border-color">
        <div>
          <TypographyH5 className="mb-2">Category</TypographyH5>
          <div className="inline-flex justify-center items-center py-[5px] px-[10px] bg-custom-background-main border-1 border-custom-border-color rounded-[8px]">
            <TypographyP>Tech/Business</TypographyP>
          </div>
        </div>
        <Separator className="border-1 border-custom-separator" />
        <div>
          <TypographyH5 className="mb-2">Select language</TypographyH5>
          <div className="flex gap-2">
            <Button>
              <TypographyP>UA</TypographyP>
            </Button>
            <Button>
              <TypographyP>ENG</TypographyP>
            </Button>
          </div>
        </div>
        <Separator className="border-1 border-custom-separator" />
        <div>
          <div className="flex gap-2 items-center mb-4">
            <TypographyH2>₴258</TypographyH2>
            <TypographyH3 className="line-through decoration-1 text-custom-text-secondary">
              ₴540
            </TypographyH3>
          </div>
          <div className="flex gap-2 mb-6">
            <Button className="flex-1 h-10">
              <TypographyB>Add to cart</TypographyB>
            </Button>
            <AddToFavorite />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-text-secondary">
                Author
              </TypographyP>
              <TypographyP>Chris Miller</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-text-secondary">
                Cover type
              </TypographyP>
              <TypographyP>Cover type</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-text-secondary">
                Number of pages
              </TypographyP>
              <TypographyP>432</TypographyP>
            </div>
            <Separator className="border-1 border-custom-separator" />
            <div className="flex justify-between w-full">
              <TypographyP className="text-custom-text-secondary">
                Year of publication
              </TypographyP>
              <TypographyP>2024</TypographyP>
            </div>
          </div>
        </div>
      </ImageContainer>
    </div>
  );
}
