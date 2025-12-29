import MyToursTable from "@/components/modules/Guide/Tour_Management/My_Tours/MyToursTable";
import TourFilters from "@/components/modules/Guide/Tour_Management/My_Tours/TourFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import RefreshButton from "@/components/shared/RefreshButton";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import { getMyTours } from "@/services/guide/tour.service";
import { ITour } from "@/types/tour.interface";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const dynamic = "force-dynamic";
interface MyToursPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyToursPage({ searchParams }: MyToursPageProps) {
  const params = await searchParams;
  
  // Convert searchParams to query string
  const queryParams: Record<string, string> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        queryParams[key] = value.join(",");
      } else {
        queryParams[key] = value;
      }
    }
  });

  const response = await getMyTours(queryParams);
  const tours: ITour[] = response?.data || [];
  const meta = response?.meta;

  return (
    <div className="space-y-6">
      {/* Header */}
      <ManagementPageHeader
        title="My Tours"
        description="Manage your tour listings and availability"
      >
        <Link href="/guide/dashboard/create-tour">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Tour
          </Button>
        </Link>
      </ManagementPageHeader>

      {/* Filters */}
      <TourFilters />


      {/* Table */}
      <MyToursTable tours={tours} />

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <TablePagination
          currentPage={meta.page}
          totalPages={meta.totalPage}
        />
      )}

    </div>
  );
}