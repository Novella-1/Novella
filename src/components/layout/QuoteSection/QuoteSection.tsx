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
    <section className="flex w-full items-center justify-center mb-[40px] xl:mb-[70px] xl:pt-26">
      <div className="w-full max-w-4xl px-4">
        <figure>
          <TypographyQ className="border-l-2 border-custom-primary-text pl-6 text-custom-primary-text">
            {quote.quote}
          </TypographyQ>

          <TypographyQD className="mt-4 text-right text-3 text-custom-primary-text">
            - {quote.work} by {quote.author}
          </TypographyQD>
        </figure>
      </div>
    </section>
  );
}
