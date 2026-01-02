export enum ReviewTargetType {
  TOUR = 'TOUR',
  GUIDE = 'GUIDE',
}

export interface IReview {
  _id?: string;
  bookingId: any;
  tourId: any;
  guideId?: any;
  authorId?: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  target: ReviewTargetType;
  rating: number;
  content?: string | null;
  photos?: string[];
  experienceTags?: string[];
  helpfulCount: number;
  verifiedBooking: boolean;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}
