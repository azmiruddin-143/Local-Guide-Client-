export enum InquiryType {
  GENERAL_INQUIRY = 'General Inquiry',
  BOOKING_SUPPORT = 'Booking Support',
  BECOME_A_GUIDE = 'Become a Guide',
  PARTNERSHIP = 'Partnership',
  TECHNICAL_ISSUE = 'Technical Issue',
  FEEDBACK = 'Feedback',
  OTHER = 'Other',
}

export interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactsData {
  contacts: Contact[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
