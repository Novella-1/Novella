import { PageWrapper } from '@/components/common/PageWrapper';
import { VideoPlayer } from '@/components/common/VideoPlayer/VideoPlayer';
import { HomePageTemplate } from '@/components/templates/HomePageTemplate';
import { TypographyH1, TypographyH2 } from '@/components/ui/custom/typography';
export default function Home() {
  return (
    <>
      <div className="relative max-w-[1920px] mx-auto">
        <VideoPlayer className="mb-[70px]" />
        <div className="flex flex-col gap-4 xl:gap-10 px-8 w-66 md:w-76 xl:w-[700px] xl:px-38 absolute top-30 xl:top-40 items-start justify-center z-10">
          <TypographyH1 className="font-marcellus font-extralight  text-custom-header-footer text-8xl xl:text-[96px]">
            Novella
          </TypographyH1>
          <div className="w-full border-1 border-custom-header-footer"></div>
          <TypographyH2 className="w-full text-custom-header-footer font-marcellus font-extralight items-start xl:text-[48px]">
            Where stories find their readers
          </TypographyH2>
        </div>
      </div>
      <PageWrapper>
        <HomePageTemplate />
      </PageWrapper>
    </>
  );
}
