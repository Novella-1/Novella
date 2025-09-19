import { TypographyP } from '../../ui/custom/typography';

export async function TwainQuote() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/quote/random`,
    {
      cache: 'no-store',
    },
  );

  const quote = await res.json();

  return (
    <section className="flex w-full items-center justify-center mb-[70px]">
      <div className="w-full max-w-4xl px-4">
        <figure>
          <TypographyP className="border-l-2 border-stone-400 pl-6 font-serif text-xl not-italic italic text-stone-800">
            {quote.quote}
          </TypographyP>

          <TypographyP className="mt-4 text-right !font-normal text-stone-600">
            - {quote.work} by {quote.author}
          </TypographyP>
        </figure>
      </div>
    </section>
  );
}
