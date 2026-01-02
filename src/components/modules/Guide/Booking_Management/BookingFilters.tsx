"use client";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const BookingFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-3 w-full">

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
        <div>
          <RefreshButton />



          {/* Clear All Filters */}
          <ClearFiltersButton />
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
