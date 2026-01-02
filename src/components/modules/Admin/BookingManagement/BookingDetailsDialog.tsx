"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IBooking } from "./bookingColumns";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BookingDetailsDialogProps {
  booking: IBooking;
  open: boolean;
  onClose: () => void;
}

const BookingDetailsDialog = ({
  booking,
  open,
  onClose,
}: BookingDetailsDialogProps) => {
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-green-100 text-green-800",
    DECLINED: "bg-red-100 text-red-800",
    CANCELLED: "bg-gray-100 text-gray-800",
    COMPLETED: "bg-blue-100 text-blue-800",
  };

  const paymentColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    INITIATED: "bg-blue-100 text-blue-800",
    SUCCEEDED: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    REFUNDED: "bg-purple-100 text-purple-800",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <span className="font-mono text-sm text-muted-foreground">
              #{booking._id.slice(-8).toUpperCase()}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badges */}
          <div className="flex items-center gap-3">
            <Badge className={statusColors[booking.status]}>
              {booking.status}
            </Badge>
            <Badge className={paymentColors[booking.paymentStatus]}>
              Payment: {booking.paymentStatus}
            </Badge>
          </div>

          {/* Tour Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Tour Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="font-medium text-lg">{booking.tourId?.title || "N/A"}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{booking.tourId?.city || "N/A"}</span>
              </div>
              {booking.tourId?.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {booking.tourId.description}
                </p>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </p>
              <p className="text-sm">
                {format(new Date(booking.startAt), "MMMM dd, yyyy")}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(booking.startAt), "hh:mm a")}
              </p>
            </div>
            {booking.endAt && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </p>
                <p className="text-sm">
                  {format(new Date(booking.endAt), "MMMM dd, yyyy")}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(new Date(booking.endAt), "hh:mm a")}
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Tourist Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Tourist Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={booking.touristId?.avatarUrl} />
                  <AvatarFallback>
                    {booking.touristId?.name?.charAt(0) || "T"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{booking.touristId?.name || "N/A"}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{booking.touristId?.email || "N/A"}</span>
                  </div>
                </div>
              </div>
              {booking.touristId?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.touristId.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guide Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-4 w-4" />
              Guide Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={booking.guideId?.avatarUrl} />
                  <AvatarFallback>
                    {booking.guideId?.name?.charAt(0) || "G"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{booking.guideId?.name || "N/A"}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{booking.guideId?.email || "N/A"}</span>
                  </div>
                </div>
              </div>
              {booking.guideId?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.guideId.phone}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Guests
              </p>
              <p className="text-2xl font-bold">{booking.numGuests}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Amount
              </p>
              <p className="text-2xl font-bold text-green-600">
                {booking.currency} {booking.amountTotal}
              </p>
              <p className="text-xs text-muted-foreground">
                {booking.currency} {(booking.amountTotal / booking.numGuests).toFixed(2)} per guest
              </p>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Special Requests
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                </div>
              </div>
            </>
          )}

          {/* Cancellation Info */}
          {booking.cancellationReason && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  Cancellation Reason
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{booking.cancellationReason}</p>
                  {booking.cancelledBy && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Cancelled by: {booking.cancelledBy.name || "N/A"}
                    </p>
                  )}
                  {booking.cancelledAt && (
                    <p className="text-xs text-muted-foreground">
                      Cancelled on: {format(new Date(booking.cancelledAt), "MMM dd, yyyy hh:mm a")}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Timestamps */}
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Booked On</p>
              <p className="font-medium">
                {format(new Date(booking.createdAt), "MMM dd, yyyy hh:mm a")}
              </p>
            </div>
            {booking.confirmedAt && (
              <div>
                <p className="text-muted-foreground">Confirmed On</p>
                <p className="font-medium">
                  {format(new Date(booking.confirmedAt), "MMM dd, yyyy hh:mm a")}
                </p>
              </div>
            )}
            {booking.completedAt && (
              <div>
                <p className="text-muted-foreground">Completed On</p>
                <p className="font-medium">
                  {format(new Date(booking.completedAt), "MMM dd, yyyy hh:mm a")}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
