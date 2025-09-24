'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageContainer } from '@/components/ui/custom/imageContainer';
import { cn } from '@/lib/utils';

interface BookPhotoContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  images?: string[];
}

export function BookPhotoContainer({
  className,
  images = [],
  ...props
}: BookPhotoContainerProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    images[0],
  );

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  if (!images.length) {
    return (
      <div
        className={cn(className)}
        {...props}
      >
        <ImageContainer className="w-full h-[424px] xl:h-[520px] bg-custom-header-footer border border-custom-border rounded-[14px] md:rounded-[16px] xl:rounded-[20px]" />
      </div>
    );
  }

  return (
    <div
      className={cn(className)}
      {...props}
    >
      <div className="flex flex-col-reverse gap-4 xl:flex-row xl:w-full xl:h-full xl:items-stretch">
        <div className="flex flex-row gap-2 overflow-x-auto xl:overflow-y-auto md:flex-row scrollbar-hide xl:flex-col">
          {images.map((img, index) => (
            <ImageContainer
              key={index}
              className={cn(
                'flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border-1 border-custom-border rounded-[4px] p-2 cursor-pointer',
                selectedImage === img ?
                  'border-custom-border'
                : 'border-custom-border',
                'hover:border-custom-button',
              )}
              onClick={() => setSelectedImage(img)}
            >
              {img && (
                <Image
                  src={`/books/${img}`}
                  width={64}
                  height={64}
                  alt="Selected book"
                  className="object-contain w-full h-full rounded-[4px]"
                />
              )}
            </ImageContainer>
          ))}
        </div>

        <ImageContainer className="w-full h-[424px] xl:w-[464px] xl:h-[524px] bg-custom-header-footer border border-custom-border rounded-[14px] sm:rounded-[16px] xl:rounded-[20px] flex items-center justify-center p-6">
          {selectedImage && (
            <Image
              src={`/books/${selectedImage}`}
              width={460}
              height={520}
              alt="Selected book"
              className="object-contain w-full h-full rounded-[14px] sm:rounded-[16px] xl:rounded-[20px]"
            />
          )}
        </ImageContainer>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col-reverse gap-8 sm:flex-row xl:h-full xl:items-stretch">
        <div className="flex flex-row gap-2 overflow-x-auto sm:flex-col sm:overflow-x-visible">
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]"></ImageContainer>
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]" />
          <ImageContainer className="flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px]" />
          {/* {images.map((img, index) => (
            <ImageContainer
              key={index}
              className={cn(
                'flex-shrink-0 w-16 h-16 xl:w-20 xl:h-20 bg-custom-header-footer border border-custom-border rounded-[4px] cursor-pointer',
                selectedImage === img && 'ring-2 ring-custom-border',
              )}
              onClick={() => setSelectedImage(img)}
            >
              <DetailImage
                src={img}
                alt={`Thumbnail ${index + 1}`}
              />
            </ImageContainer>
          ))} */
}
//   </div>

//   <ImageContainer className="w-full h-full rounded-[14px] sm:w-full sm:h-[424px] sm:rounded-[16px] xl:w-[464px] xl:h-[520px] xl:rounded-[20px] bg-custom-header-footer border border-custom-border"></ImageContainer>
// </div> */}
