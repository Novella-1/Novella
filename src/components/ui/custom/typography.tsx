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
        'font-manrope text-3xl not-italic font-bold leading-auto tracking-[-0.32px] sm:text-5xl sm:tracking-[-0.96px] text-custom-primary-text',
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
        'font-manrope leading-[30.8px] text-2xl not-italic font-bold md:text-3xl text-custom-primary-text',
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
        'font-manrope text-xl not-italic font-semibold leading-[30.8px] text-custom-primary-text',
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
        'font-manrope text-[16px] not-italic font-semibold leading-normal text-custom-primary-text',
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
        'font-manrope text-[16px] not-italic font-bold leading-6 text-custom-primary-text',
        className,
      )}
    >
      {children}
    </h5>
  );
}

//for paragraphs
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
        'font-manrope text-sm not-italic font-medium leading-[21px] text-custom-primary-text',
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
        'font-manrope text-sm not-italic font-bold leading-[21px] text-custom-button-text',
        className,
      )}
    >
      {children}
    </p>
  );
}

//for uppercase
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
        'font-manrope text-xs not-italic font-bold leading-[11px] tracking-[0.12px] uppercase text-custom-icons',
        className,
      )}
    >
      {children}
    </p>
  );
}

//for quotes
export function TypographyQ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-marcellus text-[14px] xl:text-[20px] italic leading-[14px] xl:leading-[24px] tracking-[0.12px] text-custom-primary-text',
        className,
      )}
    >
      {children}
    </p>
  );
}

//for quotes details
export function TypographyQD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-marcellus text-[12px] leading-[11px] xl:text-[16px] xl:leading-[21px] tracking-[0.12px] text-custom-primary-text',
        className,
      )}
    >
      {children}
    </p>
  );
}
