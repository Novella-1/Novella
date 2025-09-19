import { TypographyP } from '../../ui/custom/typography';

export function TwainQuote() {
  return (
    <section className="flex w-full items-center justify-center mb-[70px]">
      <div className="w-full max-w-4xl px-4">
        <figure>
          <TypographyP className="border-l-2 border-custom-icons text-custom-primary-text pl-6 font-serif text-xl italic">
            He had discovered a{' '}
            <em>great law of human action, without knowing it</em> -namely, that
            in order to make <em>a man or a boy covet a thing</em>, it is only
            necessary to make <em>the thing difficult to attain</em>.
          </TypographyP>

          <TypographyP className="mt-4 text-right !font-normal text-custom-primary-text">
            - The Adventures of Tom Sawyer by Mark Twain
          </TypographyP>
        </figure>
      </div>
    </section>
  );
}
