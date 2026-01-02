export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  REFUND_PENDING = 'REFUND_PENDING',
}
// Extras free object but with known possible fields
export interface BookingExtras {
  bookingDate?: string | Date; 
  startTime?: string;
  [key: string]: any;        
}

export interface Booking {
  _id: string;
  tourId: string;
  touristId: string;
  guideId: string;
  availabilityId?: string;

  startAt: string | Date;
  endAt: string | Date;

  numGuests: number;

  amountTotal: number;
  currency: string; 

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  specialRequests?: string | null;

  cancellationReason?: string | null;
  cancelledBy?: string | null; 
  cancelledAt?: string | Date | null;

  confirmedAt?: string | Date | null;
  completedAt?: string | Date | null;

  extras?: BookingExtras | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
