import { PageWrapper } from '@/components/common/PageWrapper';
import { VideoPlayer } from '@/components/common/VideoPlayer/VideoPlayer';
import { HomePageTemplate } from '@/components/templates/HomePageTemplate';
export default function Home() {
  return (
    <>
      <div className="max-w-[1920px]  mx-auto ">
        <VideoPlayer className="mb-[70px]" />
      </div>
      <PageWrapper>
        <HomePageTemplate />
      </PageWrapper>
    </>
  );
}
