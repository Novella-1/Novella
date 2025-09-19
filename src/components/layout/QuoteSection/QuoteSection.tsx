import { TypographyP } from '../../ui/custom/typography';

export function TwainQuote() {
  return (
    <section className="flex w-full items-center justify-center mb-[70px]">
      <div className="w-full max-w-4xl px-4">
        <figure>
          <TypographyP className="border-l-2 border-stone-400 pl-6 font-serif text-xl not-italic italic text-stone-800">
            He had discovered a{' '}
            <em>great law of human action, without knowing it</em> --namely,
            that in order to make <em>a man or a boy covet a thing</em>, it is
            only necessary to make <em>the thing difficult to attain</em>.
          </TypographyP>

          <TypographyP className="mt-4 text-right !font-normal text-stone-600">
            - The Adventures of Tom Sawyer by Mark Twain
          </TypographyP>
        </figure>
      </div>
    </section>
  );
}
