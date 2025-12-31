"use client";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const BookingFilters = () => {
  return (
    <div className="space-y-3 w-full">
      {/* Row 1: Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center gap-3 w-full">
        
        {/* Status Filter */}
        <SelectFilter
          paramName="status"
          placeholder="Status"
          defaultValue="All Status"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Confirmed", value: "CONFIRMED" },
            { label: "Declined", value: "DECLINED" },
            { label: "Cancelled", value: "CANCELLED" },
            { label: "Completed", value: "COMPLETED" },
          ]}
        />

        {/* Payment Status Filter */}
        <SelectFilter
          paramName="paymentStatus"
          placeholder="Payment"
          defaultValue="All Payments"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Initiated", value: "INITIATED" },
            { label: "Succeeded", value: "SUCCEEDED" },
            { label: "Failed", value: "FAILED" },
            { label: "Refunded", value: "REFUNDED" },
          ]}
        />

        {/* Row 2: Filter Controls */}
        <div className="flex items-center gap-3">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;