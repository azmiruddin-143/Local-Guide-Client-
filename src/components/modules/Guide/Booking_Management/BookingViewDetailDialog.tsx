"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IBooking } from "./bookingsColumns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Mail, Phone, MapPin, DollarSign, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface BookingViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  booking: IBooking | null;
}

const BookingViewDetailDialog = ({ open, onClose, booking }: BookingViewDetailDialogProps) => {
  if (!booking) return null;

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    CONFIRMED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    DECLINED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    CANCELLED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    COMPLETED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  const paymentColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    INITIATED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    SUCCEEDED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    FAILED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    REFUNDED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
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

          {/* Tourist Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Tourist Information</h3>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={booking.touristId?.avatarUrl || ""} alt={booking.touristId?.name} />
                <AvatarFallback className="text-lg">
                  {booking.touristId?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold">{booking.touristId?.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{booking.touristId?.email}</span>
                </div>
                {booking.touristId?.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{booking.touristId.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tour Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Tour Information</h3>
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <h4 className="font-semibold text-lg">{booking.tourId?.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{booking.tourId?.city}, {booking.tourId?.country}</span>
              </div>
              <p className="text-sm text-muted-foreground">{booking.tourId?.meetingPoint}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">{format(new Date(booking.startAt), "MMM dd, yyyy")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">{format(new Date(booking.startAt), "hh:mm a")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Guests</p>
                  <p className="font-medium">{booking.numGuests} {booking.numGuests === 1 ? 'Guest' : 'Guests'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-medium text-green-600">{booking.currency} {booking.amountTotal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div>
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Special Requests
              </h3>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">{booking.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Cancellation Reason */}
          {booking.cancellationReason && (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-red-600">Cancellation Reason</h3>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm">{booking.cancellationReason}</p>
                {booking.cancelledAt && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Cancelled on {format(new Date(booking.cancelledAt), "MMM dd, yyyy 'at' hh:mm a")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booked:</span>
                <span className="font-medium">{format(new Date(booking.createdAt), "MMM dd, yyyy 'at' hh:mm a")}</span>
              </div>
              {booking.confirmedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confirmed:</span>
                  <span className="font-medium">{format(new Date(booking.confirmedAt), "MMM dd, yyyy 'at' hh:mm a")}</span>
                </div>
              )}
              {booking.completedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium">{format(new Date(booking.completedAt), "MMM dd, yyyy 'at' hh:mm a")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDetailDialog;
