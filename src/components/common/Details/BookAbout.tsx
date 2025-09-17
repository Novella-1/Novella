import { Separator } from '@radix-ui/react-select';
import {
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';

interface BookAboutProps {
  className?: string;
  description?: string[] | null;
}

export function BookAbout({
  className,
  description,
  ...props
}: BookAboutProps) {
  if (!description || description.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <TypographyH3>About</TypographyH3>
        <Separator className="border-1 border-custom-primary" />
        {description.map((desc, index) =>
          index === 0 ?
            <TypographyH5 key={index}>{desc}</TypographyH5>
          : <TypographyP key={index}>{desc}</TypographyP>,
        )}
      </div>
    </div>
  );
}
