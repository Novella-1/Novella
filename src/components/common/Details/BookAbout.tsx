import { Separator } from '@radix-ui/react-select';
import {
  TypographyH3,
  TypographyH5,
  TypographyP,
} from '@/components/ui/custom/typography';
import { cn } from '@/lib/utils';

interface BookAboutProps {
  className?: string;
}

export function BookAbout({ className, ...props }: BookAboutProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <TypographyH3>About</TypographyH3>
        <Separator className="border-1 border-custom-primary" />
        <TypographyH5>
          An epic account of the decades-long battle to control the
          world&rsquo;s most critical resource—microchip technology
        </TypographyH5>
        <TypographyP>
          Power in the modern world - military, economic, geopolitical - is
          built on a foundation of computer chips. America has maintained its
          lead as a superpower because it has dominated advances in computer
          chips and all the technology that chips have enabled. (Virtually
          everything runs on chips: cars, phones, the stock market, even the
          electric grid.) Now that edge is in danger of slipping, undermined by
          the naïve assumption that globalizing the chip industry and letting
          players in Taiwan, Korea and Europe take over manufacturing serves
          America&rsquo;s interests. Currently, as Chip War reveals, China,
          which spends more on chips than any other product, is pouring billions
          into a chip-building Manhattan Project to catch up to the US.
        </TypographyP>
        <TypographyP>
          In Chip War economic historian Chris Miller recounts the fascinating
          sequence of events that led to the United States perfecting chip
          design, and how faster chips helped defeat the Soviet Union (by
          rendering the Russians&rsquo; arsenal of precision-guided weapons
          obsolete). The battle to control this industry will shape our future.
          China spends more money importing chips than buying oil, and they are
          China&rsquo;s greatest external vulnerability as they are
          fundamentally reliant on foreign chips. But with 37 per cent of the
          global supply of chips being made in Taiwan, within easy range of
          Chinese missiles, the West&rsquo;s fear is that a solution may be
          close at hand.
        </TypographyP>
      </div>
    </div>
  );
}
