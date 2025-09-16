import { Separator } from '@radix-ui/react-select';
import { TypographyH3, TypographyP } from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';

interface BookCharacteristicsProps {
  className?: string;
}

export function BookCharacteristics({
  className,
  ...props
}: BookCharacteristicsProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <TypographyH3>Characteristics</TypographyH3>
        <Separator className="border-1 border-custom-primary" />
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
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-text-secondary">
              Publication
            </TypographyP>
            <TypographyP>Nash Format</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-text-secondary">
              Format
            </TypographyP>
            <TypographyP>140х210 mm</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-text-secondary">
              LangLanguage
            </TypographyP>
            <TypographyP>UA</TypographyP>
          </div>
          <Separator className="border-1 border-custom-separator" />
          <div className="flex justify-between w-full">
            <TypographyP className="text-custom-text-secondary">
              Illustrations
            </TypographyP>
            <TypographyP>No illustrations</TypographyP>
          </div>
        </div>
      </div>
    </div>
  );
}
