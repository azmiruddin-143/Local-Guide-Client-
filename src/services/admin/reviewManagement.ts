/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function getAllReviews(queryString?: string) {
    try {
        const response = await serverFetch.get(`/reviews/all${queryString ? `?${queryString}` : ""}`);
        const result = await response.json();

        console.log(result);
        
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function deleteReviewByAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/reviews/admin/${id}`);
        const result = await response.json();
        revalidatePath('/admin/dashboard/reviews-management');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
