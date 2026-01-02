/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export interface CreateReviewPayload {
    bookingId: string;
    target: 'TOUR' | 'GUIDE';
    rating: number;
    content?: string;
    photos?: string[];
    experienceTags?: string[];
}

export interface UpdateReviewPayload {
    rating?: number;
    content?: string;
    photos?: string[];
    experienceTags?: string[];
}

export async function createReview(payload: CreateReviewPayload) {
    try {
        console.log('Creating review with payload:', payload);
        
        const response = await serverFetch.post('/reviews', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Check if response is ok
        if (!response.ok) {
            const text = await response.text();
            console.error('Error response:', text);
            return {
                success: false,
                message: `Server error: ${response.status} - ${text.substring(0, 200)}`
            };
        }
        
        const result = await response.json();
        console.log('Review created successfully:', result);
        
        revalidatePath('/dashboard/bookings');
        return result;
    } catch (error: any) {
        console.error('Create review error:', error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function updateReview(reviewId: string, payload: UpdateReviewPayload) {
    try {
        const response = await serverFetch.patch(`/reviews/${reviewId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        revalidatePath('/dashboard/bookings');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function deleteReview(reviewId: string) {
    try {
        const response = await serverFetch.delete(`/reviews/${reviewId}`);
        const result = await response.json();
        revalidatePath('/dashboard/bookings');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getReviewsByBooking(bookingId: string) {
    try {
        const response = await serverFetch.get(`/reviews/booking/${bookingId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getReviewsBytourId(tourId: string, page: number = 1, limit: number = 10) {
    try {
        const response = await serverFetch.get(`/reviews/tour/${tourId}?page=${page}&limit=${limit}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getReviewsByGuideId(guideId: string, page: number = 1, limit: number = 10) {
    try {
        const response = await serverFetch.get(`/reviews/guide/${guideId}?page=${page}&limit=${limit}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getReviewByBookingAndTarget(bookingId: string, target: 'TOUR' | 'GUIDE') {
    try {
        const response = await serverFetch.get(`/reviews/booking/${bookingId}/${target}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getMyReviews() {
    try {
        const response = await serverFetch.get('/reviews/my-reviews');
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getBestRandomReviews() {
    try {

        const response = await serverFetch.get('/reviews/best/random/reviews');

        
        if (!response.ok) {
            console.error('Failed to fetch reviews:', response.status);
            return {
                success: false,
                message: 'Failed to fetch reviews',
                data: []
            };
        }
        
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error('Error fetching best reviews:', error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
            data: []
        };
    }
}
