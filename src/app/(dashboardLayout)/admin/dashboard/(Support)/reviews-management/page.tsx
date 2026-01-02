import ReviewsManagementHeader from '@/components/modules/Admin/ReviewsManagement/ReviewsManagementHeader';
import ReviewsTable from '@/components/modules/Admin/ReviewsManagement/ReviewsTable';
import TablePagination from '@/components/shared/TablePagination';
import { getAllReviews } from '@/services/admin/reviewManagement';
import { IReview } from '@/types/review.interface';
import { queryStringFormatter } from '@/lib/formatters';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import SelectFilter from '@/components/shared/SelectFilter';
import SearchFilter from '@/components/shared/SearchFilter';
import RefreshButton from '@/components/shared/RefreshButton';
import ClearFiltersButton from '@/components/shared/ClearFiltersButton';
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Reviews Management | Admin Dashboard',
  description: 'Manage and moderate all platform reviews',
};

interface ReviewsData {
  reviews: IReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    tourReviews: number;
    guideReviews: number;
  };
}

export default async function ReviewsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  
  const reviewsResult = await getAllReviews(queryString);

  console.log(reviewsResult);
  

  return (
    <div className="space-y-6 w-full">
      {/* Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full gap-4">
        <div className="md:col-span-2">
          <SearchFilter paramName="searchTerm" placeholder="Search users..." />
        </div>
        <SelectFilter
          paramName="target"
          placeholder="Verification"
          defaultValue="All Reviews"
          options={[
            { label: "Tour Reviews", value: "TOUR" },
            { label: "Guide Reviews", value: "GUIDE" },
          ]}
        />

        <SelectFilter
          paramName="rating"
          placeholder="Verification"
          defaultValue="All Stars"
          options={[
            { label: "5 Stars", value: "5" },
            { label: "4 Stars", value: "4" },
            { label: "3 Stars", value: "3" },
            { label: "2 Stars", value: "2" },
            { label: "1 Star", value: "1" },
          ]}
        />
      <div className='flex gap-2'>
        <RefreshButton />
        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
      </div>

      <div className="">
        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
            <ReviewsTable reviews={reviewsResult.data} />
          </Suspense>
          
          {reviewsResult.meta.totalPage > 1 && (
            <TablePagination
              currentPage={reviewsResult.meta.page}
              totalPages={reviewsResult.meta.totalPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
