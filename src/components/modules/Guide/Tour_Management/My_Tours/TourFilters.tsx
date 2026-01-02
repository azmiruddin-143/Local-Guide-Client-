"use client";

import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import { TourCategory } from "@/types/tour.interface";
import { Card } from "@/components/ui/card";
import RefreshButton from "@/components/shared/RefreshButton";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";

const categoryOptions = Object.values(TourCategory).map((category) => ({
  label: category.charAt(0) + category.slice(1).toLowerCase(),
  value: category,
}));

const statusOptions = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];


export default function TourFilters() {
  return (
    <Card className="p-4">
      <div className="flex justify-between gap-4 w-full">
        {/* Search */}
        <div className=" w-full">
          <SearchFilter
            placeholder="Search tours by title, city, or country..."
            paramName="searchTerm"
          />
        </div>

        <div className="flex gap-4 ">
          {/* Category Filter */}
          <SelectFilter
            paramName="category"
            placeholder="Filter by category"
            options={categoryOptions}
            defaultValue="All Categories"
          />

          {/* Status Filter */}
          <SelectFilter
            paramName="isActive"
            placeholder="Filter by status"
            options={statusOptions}
            defaultValue="All Status"
          />

          <RefreshButton />
          <ClearFiltersButton />
       </div>

      </div>
    </Card>
  );
}
