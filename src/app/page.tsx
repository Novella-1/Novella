import { PageWrapper } from '@/components/common/PageWrapper';
import { VideoPlayer } from '@/components/common/VideoPlayer/VideoPlayer';
import { HomePageTemplate } from '@/components/templates/HomePageTemplate';
import { TypographyH1, TypographyH2 } from '@/components/ui/custom/typography';
export default function Home() {
  return (
    <>
      <div className="relative max-w-[1920px] mx-auto">
        <VideoPlayer className="mb-[70px]" />
        <div className="px-8 xl:px-38">
          <TypographyH1 className="font-marcellus font-extralight absolute top-30 xl:top-40 flex items-start justify-center z-10 text-custom-header-footer text-8xl xl:text-[96px]">
            Novella
          </TypographyH1>
          <TypographyH2 className="py-5 xl:py-10 w-60 xl:w-[550px] xl:h-[300px] absolute top-50 xl:top-70 font-marcellus font-extralight text-custom-header-footer border-t-1 border-custom-header-footer items-start xl:text-[48px]">
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
