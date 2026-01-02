"use client";

import { useState } from "react";
import ExploreHero from "./ExploreHero";
import FilterSidebar from "./FilterSidebar";
import TourGrid from "./TourGrid";
import ActiveFilters from "./ActiveFilters";
import TablePagination from "@/components/shared/TablePagination";
import SearchFilter from "@/components/shared/SearchFilter";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ExploreContentProps {
  tours: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export default function ExploreContent({ tours, pagination }: ExploreContentProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96 p-0">
                  <FilterSidebar isMobile onClose={() => setMobileFilterOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-lg border p-4 mb-6">
              <SearchFilter
                placeholder="Search tours by title, description, city..."
                paramName="searchTerm"
              />
            </div>

            {/* Active Filters */}
            <ActiveFilters />

            {/* Tours Grid */}
            <TourGrid tours={tours} />

            {/* Pagination */}
            {pagination.totalPage > 1 && (
              <div className="mt-8">
                <TablePagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
