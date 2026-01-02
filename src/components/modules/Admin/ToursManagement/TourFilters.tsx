"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const TourFilters = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SearchFilter
          placeholder="Search by title, city, or country..."
          paramName="searchTerm"
        />

        <SelectFilter
          placeholder="Filter by Category"
          paramName="category"
          options={[
            { label: "Food", value: "FOOD" },
            { label: "History", value: "HISTORY" },
            { label: "Adventure", value: "ADVENTURE" },
            { label: "Art", value: "ART" },
            { label: "Nightlife", value: "NIGHTLIFE" },
            { label: "Shopping", value: "SHOPPING" },
            { label: "Photography", value: "PHOTOGRAPHY" },
            { label: "Nature", value: "NATURE" },
            { label: "Culture", value: "CULTURE" },
            { label: "Other", value: "OTHER" },
          ]}
        />

        <SelectFilter
          placeholder="Filter by Status"
          paramName="isActive"
          options={[
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
        />
      <div className="flex items-center gap-2">
        <ClearFiltersButton />
        <RefreshButton />
      </div>
      </div>

    </div>
  );
};

export default TourFilters;
