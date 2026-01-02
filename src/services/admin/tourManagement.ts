/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function getAllToursAdmin(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tours/admin/all-tours${queryString ? `?${queryString}` : ""}`);
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

export async function getTourByIdAdmin(id: string) {
    try {
        const response = await serverFetch.get(`/tours/${id}`)
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

export async function updateTourAdmin(id: string, payload: any) {
    try {
        const response = await serverFetch.patch(`/tours/admin/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        const result = await response.json();
        revalidatePath('/admin/dashboard/tours-management');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
        }
    }
}

export async function deleteTourAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/tours/admin/${id}`)
        const result = await response.json();
        revalidatePath('/admin/dashboard/tours-management');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function toggleTourStatusAdmin(id: string) {
    try {
        const response = await serverFetch.patch(`/tours/admin/${id}/toggle-status`)
        const result = await response.json();
        revalidatePath('/admin/dashboard/tours-management');
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
