"use client";

import TourCard from "./TourCard";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TourListItem from "./TourListItem";

interface TourGridProps {
  tours: any[];
}

export default function TourGrid({ tours }: TourGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (tours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Grid className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{tours.length}</span> tours found
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tours Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tours.map((tour) => (
            <TourListItem key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
