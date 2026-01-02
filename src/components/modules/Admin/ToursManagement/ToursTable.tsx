"use client";

import { useState } from "react";
import { TourColumn } from "./toursColumns";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Power } from "lucide-react";
import TourViewDetailDialog from "./TourViewDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteTourAdmin, toggleTourStatusAdmin } from "@/services/admin/tourManagement";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ToursTableProps {
  tours: TourColumn[];
}

const ToursTable = ({ tours }: ToursTableProps) => {
  const [selectedTour, setSelectedTour] = useState<TourColumn | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleView = (tour: TourColumn) => {
    setSelectedTour(tour);
    setViewDialogOpen(true);
  };


  const handleDelete = (tour: TourColumn) => {
    setSelectedTour(tour);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTour) return;

    setLoading(true);
    try {
      const result = await deleteTourAdmin(selectedTour._id);

      if (result.success) {
        toast.success("Tour deleted successfully");
        setDeleteDialogOpen(false);
      } else {
        toast.error(result.message || "Failed to delete tour");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  const handleToggleStatus = async (tour: TourColumn) => {
    try {
      const result = await toggleTourStatusAdmin(tour._id);

      if (result.success) {
        toast.success(
          `Tour ${tour.isActive ? "deactivated" : "activated"} successfully`
        );
      } else {
        toast.error(result.message || "Failed to update tour status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour Info</TableHead>
              <TableHead>Guide</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Languages</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No tours found
                </TableCell>
              </TableRow>
            ) : (
              tours.map((tour) => (
                <TableRow key={tour._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage
                          src={tour.mediaUrls?.[0] || "/placeholder-tour.jpg"}
                          alt={tour.title}
                          className="object-cover"
                        />
                        <AvatarFallback className="rounded-md">
                          {tour.title.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{tour.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {tour.city}, {tour.country}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={tour.guideId?.avatarUrl} alt={tour.guideId?.name} />
                        <AvatarFallback>
                          {tour.guideId?.name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{tour.guideId?.name}</span>
                        <span className="text-xs text-muted-foreground">{tour.guideId?.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {tour.category.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tour.languages?.slice(0, 2).map((lang, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {tour.languages?.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{tour.languages.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tour.isActive ? "default" : "secondary"}>
                      {tour.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(tour.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(tour)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                     
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(tour)}
                        title={tour.isActive ? "Deactivate" : "Activate"}
                      >
                        <Power className={`h-4 w-4 ${tour.isActive ? "text-green-600" : "text-gray-400"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(tour)}
                        title="Delete Tour"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TourViewDetailDialog
        tour={selectedTour}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Tour"
        description={`Are you sure you want to delete "${selectedTour?.title}"? This action cannot be undone.`}
        isDeleting={loading}
      />
    </>
  );
};

export default ToursTable;
