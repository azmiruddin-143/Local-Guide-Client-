export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum TimeOfDay {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
}

export interface IAvailability {
  _id: string;
  guideId: string;
  specificDate: string; // ISO date string
  startTime: string;
  endTime: string;
  timeOfDay: TimeOfDay;
  durationMins: number;
  maxGroupSize: number;
  pricePerPerson: number;
  todaysTourist?: {
    isBooked: boolean;
    count: number;
    tourId: string | null;
    maxGuests: number;
  };
  dayOfWeek?: DayOfWeek;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAvailabilityPayload {
  specificDate: string; // ISO date string
  startTime: string;
  endTime: string;
  durationMins: number;
  maxGroupSize: number;
  pricePerPerson: number;
  isAvailable: boolean;
  todaysTourist?: {
    maxGuests: number;
  };
}

export interface UpdateAvailabilityPayload {
  specificDate?: string;
  startTime?: string;
  endTime?: string;
  durationMins?: number;
  maxGroupSize?: number;
  pricePerPerson?: number;
  isAvailable?: boolean;
  todaysTourist?: {
    maxGuests?: number;
  };
}

export interface AvailabilityResponse {
  success: boolean;
  message: string;
  data: IAvailability | IAvailability[] | null;
}
