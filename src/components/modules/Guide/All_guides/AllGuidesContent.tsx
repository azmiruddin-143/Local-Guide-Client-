'use client';

import { useState, useCallback } from 'react';
import { UserInfo } from '@/types/user.interface';
import GuideCard from './GuideCard';
import { Filter, X } from 'lucide-react';
import GuidePagination from './GuidePagination';
import GuideFiltersPanel from './GuideFiltersPanel';
import GuideSearchBar from './GuideSearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import SelectFilter from '@/components/shared/SelectFilter';

interface FilterOptions {
  languages: string[];
  expertise: string[];
}

interface AllGuidesContentProps {
  guides: UserInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  filterOptions: FilterOptions;
}

export default function AllGuidesContent({ guides, pagination, filterOptions }: AllGuidesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Get current filters from URL
  const currentFilters = {
    searchTerm: searchParams.get('searchTerm') || '',
    languages: searchParams.get('languages')?.split(',').filter(Boolean) || [],
    expertise: searchParams.get('expertise')?.split(',').filter(Boolean) || [],
    isVerified: searchParams.get('isVerified') === 'true' ? true : searchParams.get('isVerified') === 'false' ? false : undefined,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  };

  const updateURL = useCallback((newParams: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 when filters change (except when changing page itself)
    if (!newParams.page) {
      params.set('page', '1');
    }

    router.push(`/all-guides?${params.toString()}`);
  }, [searchParams, router]);

  const handleSearch = useCallback((searchTerm: string) => {
    updateURL({ searchTerm });
  }, [updateURL]);

  const handleFilterChange = useCallback((newFilters: Record<string, any>) => {
    updateURL(newFilters);
  }, [updateURL]);

  const handlePageChange = useCallback((page: number) => {
    updateURL({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [updateURL]);

  const clearFilters = useCallback(() => {
    router.push('/all-guides');
  }, [router]);

  const hasActiveFilters = Boolean(
    currentFilters.searchTerm || 
    currentFilters.languages.length > 0 || 
    currentFilters.expertise.length > 0 ||  
    currentFilters.isVerified !== undefined
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          🌍 Discover Amazing Local Guides
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with verified local experts who will make your journey unforgettable
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <GuideSearchBar onSearch={handleSearch} initialValue={currentFilters.searchTerm} availableExpertise={filterOptions.expertise} />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showFilters ? <X size={20} /> : <Filter size={20} />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`
          lg:w-80 lg:block
          ${showFilters ? 'block' : 'hidden'}
        `}>
          <div className="sticky top-4">
            <GuideFiltersPanel
              filters={currentFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              availableLanguages={filterOptions.languages}
              availableExpertise={filterOptions.expertise}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              {/* <h2 className="text-2xl font-semibold text-gray-900">
                {pagination.total} Guides Found
              </h2> */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className='flex gap-2 items-center  '>
              <Label className="text-sm text-nowrap font-semibold text-gray-900 mb-3 block">
                Sort By
              </Label>
              <SelectFilter
                paramName="sort"
                placeholder="Sort by"
                options={[
                  { value: "-createdAt", label: "Newest First" },
                  { value: "createdAt", label: "Oldest First" },
                  { value: "name", label: "Name: A to Z" },
                  { value: "-name", label: "Name: Z to A" },
                ]}
                defaultValue="All"
              />
            </div>
          </div>

          {/* Guides Grid */}
          {guides.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No guides found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <GuideCard key={guide._id} guide={guide} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPage > 1 && (
                <div className="mt-12">
                  <GuidePagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
