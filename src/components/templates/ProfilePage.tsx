import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BackButton } from '../common/BackButton/BackButton';
import { Button } from '../ui/button';
import { ExitIcon } from '../ui/custom/icons';
import { TypographyH2, TypographyP } from '../ui/custom/typography';

interface ProfilePageProps {
  className?: string;
}

export function ProfilePage({ className, ...props }: ProfilePageProps) {
  return (
    <div
      className={cn('py-16 xl:py-24')}
      {...props}
    >
      <div className="flex justify-between mb-4 items-center">
        <BackButton />
        <Link href="#">
          <ExitIcon className="w-5 h-5 text-custom-button" />
        </Link>
      </div>
      <TypographyH2 className="mb-4 xl:mb-6 xl:text-4xl">Profile</TypographyH2>
      <div className="flex flex-col w-full md:flex-row md:gap-10 md:items-center">
        <div className="w-full flex flex-col gap-6 mb-8 xl:w-1/2">
          <div>
            <div className="border-custom-border border-b-1">
              <TypographyP className="text-custom-primary-text/50 font-manrope">
                Name
              </TypographyP>
            </div>
          </div>
          <div>
            <div className="border-custom-border border-b-1">
              <TypographyP className="text-custom-primary-text/50 font-manrope">
                Surname
              </TypographyP>
            </div>
          </div>
          <div>
            <div className="border-custom-border border-b-1">
              <TypographyP className="text-custom-primary-text/50 font-manrope">
                Email
              </TypographyP>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <Button className="px-8 py-5 bg-custom-button text-custom-button-text font-bold border border-custom-border">
            Favourites
          </Button>
          <Button className="px-8 py-5 bg-custom-button text-custom-button-text font-bold border border-custom-border">
            Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
