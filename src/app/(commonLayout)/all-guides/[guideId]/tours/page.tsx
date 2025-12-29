import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideById, getGuideTours } from '@/services/guide/guide.service';
import GuideToursContent from '@/components/modules/Guide/All_guides/ProfileAndTours/GuideToursContent';

interface GuideToursPageProps {
  params: Promise<{ guideId: string }>;
}

export async function generateMetadata({ params }: GuideToursPageProps): Promise<Metadata> {
  const { guideId } = await params;
  const result = await getGuideById(guideId);

  if (!result.success || !result.data) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `Tours by ${result.data.name} | Local Guide Tours`,
    description: `Explore all tours offered by ${result.data.name}`,
  };
}

export default async function GuideToursPage({ params }: GuideToursPageProps) {
  const { guideId } = await params;

  // Fetch guide details and tours in parallel
  const [guideResult, toursResult] = await Promise.all([
    getGuideById(guideId),
    getGuideTours(guideId),
  ]);

  if (!guideResult.success || !guideResult.data) {
    notFound();
  }

  return (
    <GuideToursContent
      guide={guideResult.data}
      tours={toursResult.data || []}
    />
  );
}