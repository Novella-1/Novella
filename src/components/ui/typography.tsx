import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function TypographyH1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'font-manrope text-[32px] not-italic font-bold leading-[41px] tracking-[-0.32px] sm:text-[48px] sm:leading-[56px] sm:tracking-[-0.96px]',
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'font-manrope text-[22px] not-italic font-bold leading-[30.8px] sm:text-[32px] sm:leading-[41px] sm:tracking-[-0.32px]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'font-manrope text-[22px] not-italic font-semibold leading-[30.8px]',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        'font-manrope text-[20px] not-italic font-semibold leading-normal',
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h5
      className={cn(
        'font-manrope text-base not-italic font-bold leading-6',
        className,
      )}
    >
      {children}
    </h5>
  );
}

//paragraph
export function TypographyP({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-manrope text-sm not-italic font-medium leading-[21px]',
        className,
      )}
    >
      {children}
    </p>
  );
}

//for buttons
export function TypographyB({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-manrope text-sm not-italic font-bold leading-[21px]',
        className,
      )}
    >
      {children}
    </p>
  );
}

//uppercase for header/footer
export function TypographyU({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-manrope text-xs not-italic font-bold leading-[11px] tracking-[0.12px] uppercase',
        className,
      )}
    >
      {children}
    </p>
  );
}
