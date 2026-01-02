import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/shared/ManagementTable";
import { ITour, TourCategory } from "@/types/tour.interface";
import { formatDateTime } from "@/lib/formatters";

const categoryColors: Record<TourCategory, string> = {
  [TourCategory.FOOD]: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  [TourCategory.HISTORY]: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  [TourCategory.ADVENTURE]: "bg-red-100 text-red-800 hover:bg-red-200",
  [TourCategory.ART]: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  [TourCategory.NIGHTLIFE]: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  [TourCategory.SHOPPING]: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  [TourCategory.PHOTOGRAPHY]:
    "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  [TourCategory.NATURE]: "bg-green-100 text-green-800 hover:bg-green-200",
  [TourCategory.CULTURE]: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  [TourCategory.OTHER]: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

export const tourColumns: Column<ITour>[] = [
  {
    header: "Title",
    accessor: (tour) => (
      <div className="max-w-[250px]">
        <p className="font-medium truncate">{tour.title}</p>
        <p className="text-sm text-muted-foreground truncate">
          {tour.city}, {tour.country}
        </p>
      </div>
    ),
    sortKey: "title",
  },
  {
    header: "Category",
    accessor: (tour) => (
      <Badge className={categoryColors[tour.category]} variant="secondary">
        {tour.category}
      </Badge>
    ),
    sortKey: "category",
  },
  {
    header: "Languages",
    accessor: (tour) => (
      <div className="flex flex-wrap gap-1">
        {tour.languages.slice(0, 2).map((lang) => (
          <Badge key={lang} variant="outline" className="text-xs">
            {lang.toUpperCase()}
          </Badge>
        ))}
        {tour.languages.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{tour.languages.length - 2}
          </Badge>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (tour) => (
      <Badge
        variant={tour.isActive ? "default" : "secondary"}
        className={
          tour.isActive
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
      >
        {tour.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
    sortKey: "isActive",
  },
  {
    header: "Created",
    accessor: (tour) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTime(tour.createdAt)}
      </span>
    ),
    sortKey: "createdAt",
  },
];
