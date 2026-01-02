export enum PaymentStatus {
  PAID = "PAID",
  INITIATED = "INITIATED",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  REFUND_PENDING = "REFUND_PENDING",
}

export interface IPayment {
  _id: string;
  bookingId: {
    _id: string;
    tourId: {
      _id: string;
      title: string;
      mediaUrls: string[];
      city: string;
      country: string;
    };
    touristId?: {
      _id: string;
      name: string;
      email: string;
      avatarUrl?: string;
    };
    guideId: {
      _id: string;
      name: string;
      email?: string;
      avatarUrl?: string;
    };
    numGuests: number;
    amountTotal: number;
    extras?: {
      bookingDate: string;
      startTime: string;
    };
  };
  amount: number;
  currency: string;
  provider: string;
  transactionId: string;
  status: PaymentStatus;
  paymentGatewayData?: any;
  metadata?: {
    refundReason?: string;
    refundAmount?: number;
    adminNotes?: string;
    refundedAt?: string;
    [key: string]: any;
  };
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  status?: PaymentStatus;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PaymentStats {
  [key: string]: {
    totalAmount: number;
    count: number;
  };
}

export interface PaymentMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  stats: PaymentStats;
}
