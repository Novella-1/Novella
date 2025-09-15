import { ImageContainer } from '@/components/ui/custom/imageContainer';
import { cn } from '@/lib/utils';

interface BookPhotoContainerProps {
  className?: string;
}

export function BookPhotoContainer({
  className,
  ...props
}: BookPhotoContainerProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col-reverse gap-8 sm:flex-row xl:h-full xl:items-stretch">
        <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:overflow-x-visible">
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-bg border border-custom-border-color rounded-[4px]" />
        </div>

        <ImageContainer className="w-full h-full rounded-[14px] sm:w-full sm:h-[424px] sm:rounded-[16px] xl:w-[464px] xl:h-[520px] xl:rounded-[20px] bg-custom-header-bg border border-custom-border-color" />
      </div>
    </div>
  );
}
