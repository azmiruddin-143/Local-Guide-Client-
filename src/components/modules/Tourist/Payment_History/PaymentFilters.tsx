"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import { PaymentStatus } from "@/types/payment.interface";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

export default function PaymentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("searchTerm", searchTerm);
    if (status) params.set("status", status);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    router.push("?");
  };

  const hasFilters =
    searchParams.get("searchTerm") ||
    searchParams.get("status") ||
    searchParams.get("startDate") ||
    searchParams.get("endDate");

  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
       
          <div className="md:col-span-3">
            <SearchFilter paramName="searchTerm" placeholder="Search TNX..." />
          </div>
          {/* Status Filter */}
          <SelectFilter
            paramName="status"
            placeholder="Status"
            defaultValue="All Status"
            options={[
              { label: "PAID", value: "PAID" },
              { label: "FAILED", value: "FAILED" },
              { label: "UNPAID", value: "UNPAID" },
              { label: "INITIATED", value: "INITIATED" },
              { label: "REFUNDED", value: "REFUNDED" },
              { label: "REFUND PENDING", value: "REFUND_PENDING" },
            ]}
        />
        
        <div className="flex items-center justify-between">
         
          <div className="flex items-center gap-2">
            <RefreshButton />
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

     
    </div>
  );
}
