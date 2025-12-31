"use client";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const UserFilters = () => {
  return (
    <div className="space-y-3">
        <div className="sm:flex items-center gap-3">
      {/* Row 1: Search and Refresh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5  items-center gap-3 w-full">
        <div className="md:col-span-2">
          <SearchFilter paramName="searchTerm" placeholder="Search users..." />
       </div>
        {/* Role Filter */}
        <SelectFilter
          paramName="role"
          placeholder="Role"
          defaultValue="All Roles"
          options={[
            { label: "Admin", value: "ADMIN" },
            { label: "Guide", value: "GUIDE" },
            { label: "Tourist", value: "TOURIST" },
          ]}
        />

        {/* Verified Filter */}
        <SelectFilter
          paramName="isVerified"
          placeholder="Verification"
            defaultValue="All Verification"
          options={[
            { label: "Verified", value: "true" },
            { label: "Not Verified", value: "false" },
          ]}
        />
     
        {/* Deleted Filter */}
        <SelectFilter
            paramName="isActive"
          placeholder="Status"
          defaultValue="All Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "InActive", value: "INACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
          ]}
        />
      </div>

      {/* Row 2: Filter Controls */}
        


        <RefreshButton />
        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default UserFilters;