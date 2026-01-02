import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideById, getGuideAvailability } from '@/services/guide/guide.service';
import GuideProfileContent from '@/components/modules/Guide/All_guides/ProfileAndTours/GuideProfileContent';


interface GuideProfilePageProps {
  params: Promise<{ guideId: string }>;
}

export async function generateMetadata({ params }: GuideProfilePageProps): Promise<Metadata> {
  const { guideId } = await params;
  const result = await getGuideById(guideId);

  if (!result.success || !result.data) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: `${result.data.name} - Local Guide | Expert Tours`,
    description: result.data.bio || `Book tours with ${result.data.name}, a verified local guide`,
  };
}

export default async function GuideProfilePage({ params }: GuideProfilePageProps) {
  const { guideId } = await params;

  // Fetch guide details and availability in parallel
  const [guideResult, availabilityResult] = await Promise.all([
    getGuideById(guideId),
    getGuideAvailability(guideId),
  ]);

  if (!guideResult.success || !guideResult.data) {
    notFound();
  }

  return (
    <GuideProfileContent
      guide={guideResult.data}
      availability={availabilityResult.data || []}
    />
  );
}
