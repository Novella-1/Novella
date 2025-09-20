import { TypographyQ, TypographyQD } from '../../ui/custom/typography';

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
          <TypographyQ className="border-l-2 border-custom-button pl-6">
            {quote.quote}
          </TypographyQ>

          <TypographyQD className="mt-4 text-right text-3">
            - {quote.work} by {quote.author}
          </TypographyQD>
        </figure>
      </div>
    </section>
  );
}
