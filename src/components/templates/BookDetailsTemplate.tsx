import { cn } from '@/lib/utils';
import { BookAbout } from '../common/Details/BookAbout';
import { BookCharacteristics } from '../common/Details/BookCharacteristics';
import { BookInfo } from '../common/Details/BookInfo';
import { BookPhotoContainer } from '../common/Details/BookPhotosContainers';
import { TypographyH2, TypographyP } from '../ui/custom/typography';

interface BookDetailsTemplateProps {
  className?: string;
}

export function BookDetailsTemplate({ className }: BookDetailsTemplateProps) {
  return (
    <div className={cn(className)}>
      <div className="mb-8">
        <div className="mb-8">
          <TypographyH2 className="mb-1.5">
            Chip War. The Fight for the World&rsquo;s Most Critical Technology
          </TypographyH2>
          <TypographyP>Chris Miller</TypographyP>
        </div>

        <div className="flex flex-col gap-6 sm:flex-col sm:gap-[34px] xl:flex-row xl:gap-[72px] xl:h-[524px] xl:items-start">
          <BookPhotoContainer className="xl:w-2/3" />
          <BookInfo className="xl:w-1/3 xl:h-full" />
        </div>
      </div>

      <div className="flex flex-col gap-10 mb-20">
        <BookAbout />
        <BookCharacteristics />
      </div>
    </div>
  );
}
