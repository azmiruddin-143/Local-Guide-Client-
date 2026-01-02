"use client";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const PayoutFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Main Filters */}
      <div className="flex items-center gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-3 w-full">
          <div className="md:col-span-2">
            <SearchFilter paramName="searchTerm" placeholder="Search by Status, Payment Method..." />
          </div>

          {/* Status Filter */}
          <SelectFilter
            paramName="status"
            placeholder="Status"
            defaultValue="All Status"
            options={[
              { label: "Pending", value: "PENDING" },
              { label: "Processing", value: "PROCESSING" },
              { label: "Sent", value: "SENT" },
              { label: "Failed", value: "FAILED" },
              { label: "Cancelled", value: "CANCELLED" },
            ]}
          />

          {/* Payment Method Filter */}
          <SelectFilter
            paramName="paymentMethod"
            placeholder="Payment Method"
            defaultValue="All Methods"
            options={[
              { value: "bank_transfer", label: "Bank Transfer" },
              { value: "bkash", label: "bKash" },
              { value: "nagad", label: "Nagad" },
              { value: "rocket", label: "Rocket" },
            ]}
          />

        
        </div>
        <RefreshButton />
     </div>

      {/* Row 2: Additional Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default PayoutFilters;
