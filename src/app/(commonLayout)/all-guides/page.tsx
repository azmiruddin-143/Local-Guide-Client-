
import { Metadata } from 'next';
import AllGuidesContent from '@/components/modules/Guide/All_guides/AllGuidesContent';
import { getAllGuides, getGuideFilterOptions } from '@/services/auth/allGuides';
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Find Your Perfect Local Guide | Explore with Experts',
  description: 'Browse verified local guides worldwide. Filter by language, expertise, location, and availability. Book authentic experiences with trusted guides.',
};

interface AllGuidesPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function AllGuidesPage({ searchParams }: AllGuidesPageProps) {
  // Await searchParams as it's now a Promise in Next.js 15+
  const resolvedSearchParams = await searchParams;

  // Set default limit if not provided
  const params = {
    ...resolvedSearchParams,
    limit: resolvedSearchParams.limit || "12",
    page: resolvedSearchParams.page || "1",
  };

  // Fetch guides and filter options in parallel
  const [guidesResult, filterOptionsResult] = await Promise.all([
    getAllGuides(params),
    getGuideFilterOptions(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <AllGuidesContent
        guides={guidesResult.data || []}
        pagination={guidesResult.meta}
        filterOptions={filterOptionsResult.data}
      />
    </div>
  );
}
