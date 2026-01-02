/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerTouristValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    role: z.enum(["TOURIST", "GUIDE"]).default("TOURIST"),
    password: z.string().min(6, {
        message: "Password is required and must be at least 6 characters long",
    }).max(100, {
        message: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm Password is required and must be at least 6 characters long",
    }),
    phoneNumber: z.string().optional(),
    location: z.string().optional(),
}).refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const registerGuideValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    role: z.enum(["TOURIST", "GUIDE"]).default("GUIDE"),
    password: z.string().min(6, {
        message: "Password is required and must be at least 6 characters long",
    }).max(100, {
        message: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm Password is required and must be at least 6 characters long",
    }),
    phoneNumber: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    languages: z.array(z.string()).optional(),
    expertise: z.array(z.string()).optional(),
    dailyRate: z.number().min(0, { message: "Daily rate must be positive" }).optional(),
}).refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Valid email is required",
    }),
    password: z.string().min(6, {
        message: "Password is required and must be at least 6 characters long",
    }).max(100, {
        message: "Password must be at most 100 characters long",
    }),
});



export const forgotPasswordSchema = z.object({
    email: z.email({
        message: "Valid email is required",
    }),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const resetPasswordSchema = z
    .object({
        id: z.string().min(1, "Reset id is required"),
        token: z.string().min(1, "Reset token is required"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });