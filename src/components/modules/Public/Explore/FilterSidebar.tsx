"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SelectFilter from "@/components/shared/SelectFilter";
import MultiSelectFilter from "@/components/shared/MultiSelectFilter";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import { Filter, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const categories = [
  { value: "FOOD", label: "Food & Culinary" },
  { value: "HISTORY", label: "History & Heritage" },
  { value: "ADVENTURE", label: "Adventure" },
  { value: "ART", label: "Art & Culture" },
  { value: "NIGHTLIFE", label: "Nightlife" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "PHOTOGRAPHY", label: "Photography" },
  { value: "NATURE", label: "Nature & Wildlife" },
  { value: "CULTURE", label: "Cultural" },
  { value: "OTHER", label: "Other" },
];

const languages = [
  { value: "English", label: "English" },
  { value: "Bangla", label: "Bangla" },
  { value: "Arabic", label: "Arabic" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Hindi", label: "Hindi" },
  { value: "Urdu", label: "Urdu" },
];


interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ isMobile, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();


  const [groupSize, setGroupSize] = useState([
    parseInt(searchParams.get("minGroupSize") || "1"),
    parseInt(searchParams.get("maxGroupSize") || "50"),
  ]);

  const applyGroupSizeFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minGroupSize", groupSize[0].toString());
    params.set("maxGroupSize", groupSize[1].toString());
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className={`bg-white ${isMobile ? "h-full overflow-y-auto" : "rounded-lg border"} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Clear Filters */}
      <div className="mb-6">
        <ClearFiltersButton
          className="w-full"
          variant="outline"
          excludeFromCount={["page", "limit", "sort"]}
        />
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-semibold text-gray-900 mb-3 block">
            Category
          </Label>
          <MultiSelectFilter
            paramName="category"
            options={categories}
            placeholder="Select categories"
            searchPlaceholder="Search categories..."
            triggerClassName="w-full"
            showBadges={true}
          />
        </div>

        {/* Languages */}
        <div>
          <Label className="text-sm font-semibold text-gray-900 mb-3 block">
            Languages
          </Label>
          <MultiSelectFilter
            paramName="languages"
            options={languages}
            placeholder="Select languages"
            searchPlaceholder="Search languages..."
            triggerClassName="w-full"
            showBadges={true}
          />
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-semibold text-gray-900 mb-3 block">
            Sort By
          </Label>
          <SelectFilter
            paramName="sort"
            placeholder="Sort by"
            options={[
              { value: "-createdAt", label: "Newest First" },
              { value: "createdAt", label: "Oldest First" },
              { value: "price", label: "Price: Low to High" },
              { value: "-price", label: "Price: High to Low" },
              { value: "title", label: "Name: A to Z" },
              { value: "-title", label: "Name: Z to A" },
            ]}
            defaultValue="All"
          />
        </div>
      </div>
    </div>
  );
}
