import { BookMarkModal } from '@/components/common/Bookmark/BookmarkModal';
import { PageWrapper } from '@/components/common/PageWrapper';
import { VideoPlayer } from '@/components/common/VideoPlayer/VideoPlayer';
import { HomePageTemplate } from '@/components/templates/HomePageTemplate';
import { TypographyH1, TypographyH2 } from '@/components/ui/custom/typography';
export default function Home() {
  
  return (
    <>
      <div className="bg-custom-hero-bg">
        <div className="relative max-w-[1920px] mx-auto xl:h-210">
          <VideoPlayer className="mb-[40px] xl:mb-[70px] xl:h-210" />
          <div className="flex flex-col gap-4 xl:gap-10 px-8 w-66 md:w-76 xl:w-[700px] xl:px-38 absolute top-30 xl:top-50 items-start justify-center z-10">
            <TypographyH1 className="font-marcellus font-extralight text-custom-button-text text-8xl xl:text-[96px]">
              Novella
            </TypographyH1>
            <div className="w-full border-1 border-custom-button-text"></div>
            <TypographyH2 className="w-full text-custom-button-text font-marcellus font-extralight items-start xl:text-[48px]">
              Where stories find their readers
            </TypographyH2>
          </div>
        </div>
      </div>
      <PageWrapper className="relative">
        <HomePageTemplate />
        <BookMarkModal />
      </PageWrapper>
    </>
  );
}
