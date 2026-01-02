"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";


export function PayoutFilters() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
      <div className="sm:col-span-2 md:col-span-3">
        <SearchFilter placeholder="Search by Stats, Payment Method..." />
      </div>
      <SelectFilter
        paramName="status"
        placeholder="Status"
        options={[
          { value: "PENDING", label: "Pending" },
          { value: "SENT", label: "Sent" },
          { value: "FAILED", label: "Failed" },
          { value: "CANCELLED", label: "Cancelled" },
        ]}
      />
      
      <SelectFilter
        paramName="paymentMethod"
        placeholder="Payment Method"
        options={[
          { value: "bank_transfer", label: "Bank Transfer" },
          { value: "bkash", label: "bKash" },
          { value: "nagad", label: "Nagad" },
          { value: "rocket", label: "Rocket" },
        ]}
      />
      <div> <RefreshButton /> <ClearFiltersButton /></div>
    </div>
  );
}
