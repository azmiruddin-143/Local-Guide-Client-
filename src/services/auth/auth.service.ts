"use server";

import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/lib/tokenHandlers";
import { zodValidator } from "@/lib/zodValidator";
import { changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } from "@/zod/auth.validation";
import { revalidatePath, revalidateTag } from "next/cache";
import jwt from 'jsonwebtoken';
import { getUserInfo } from "./getUserInfo";
import { redirect } from "next/navigation";


/* eslint-disable @typescript-eslint/no-explicit-any */
export async function updateMyProfile(formData: FormData) {
    try {

        const uploadFormData = new FormData();
        const data: any = {};

        // Extract all non-file data
        formData.forEach((value, key) => {
            if (key !== 'file' && value) {
                // Parse JSON strings back to arrays
                if (key === 'languages' || key === 'expertise' || key === 'travelPreferences') {
                    try {
                        const parsed = JSON.parse(value as string);
                        data[key] = parsed;
                        console.log(`Parsed ${key}:`, parsed);
                    } catch (e) {
                        data[key] = value;
                        console.log(`Could not parse ${key}, using as-is:`, value);
                    }
                } else if (key === 'dailyRate') {
                    // Convert dailyRate to number
                    const numValue = parseFloat(value as string);
                    if (!isNaN(numValue)) {
                        data[key] = numValue;
                        console.log(`Converted ${key} to number:`, numValue);
                    }
                } else {
                    data[key] = value;
                }
            }
        });


        // Append the data object as JSON
        uploadFormData.append('data', JSON.stringify(data));
        
        // Handle file upload
        const file = formData.get('file');
        
        if (file && file instanceof File && file.size > 0) {
            uploadFormData.append('picture', file);
        } else {
            console.log('✗ No file to upload or invalid file');
        }


        const response = await serverFetch.patch(`/user/update-profile`, {
            body: uploadFormData,
        });


        const result = await response.json();

        if (result.success) {
            revalidatePath('/my-profile');
            revalidatePath('/', 'layout');
        }

        return result;
    } catch (error: any) {
        console.error('Profile update error:', error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



// Change Password
export async function changePassword(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        oldPassword: formData.get("oldPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(validationPayload, changePasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        // API Call
        const response = await serverFetch.post("/auth/change-password", {
            body: JSON.stringify({
                oldPassword: validationPayload.oldPassword,
                newPassword: validationPayload.newPassword,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to change password");
        }

        return {
            success: true,
            message: "Password changed successfully",
        };

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}

// Forgot Password
export async function forgotPassword(_prevState: any, formData: FormData) {
    // Build validation payload 
    const validationPayload = {
        email: formData.get("email") as string,
    };
    
    // Validate
    const validatedPayload = zodValidator(validationPayload, forgotPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        // API Call
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgot-password`, {
            method: "POST",
            body: JSON.stringify({
                email: validationPayload.email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to send reset email");
        }

        return {
            success: true,
            message: "Password reset link sent to your email",
        };

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}

// Reset Password
export async function resetPasswordWithToken(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        id: formData.get("id") as string,
        token: formData.get("token") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(validationPayload, resetPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    console.log(validatedPayload);
    

    try {
        // API Call
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/reset-password`, {
            method: "POST",
            body: JSON.stringify({
                id: validationPayload.id as string,
                token: validationPayload.token as string,
                newPassword: validationPayload.newPassword as string,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        console.log(result);
        

        if (!result.success) {
            throw new Error(result.message || "Failed to reset password");
        }

        return {
            success: true,
            message: "Password reset successfully. You can now login with your new password.",
        };

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}