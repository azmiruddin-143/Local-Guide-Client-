/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerTouristValidationZodSchema, registerGuideValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";


export const register = async (_currentState: any, formData: any): Promise<any> => {
    try {
        // Extract all form data
        const role = formData.get('role') || 'TOURIST';
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        const payload = {
            name,
            role,
            email,
            password,
            confirmPassword,
        }

        console.log('Form payload:', payload);

        // Validate based on role
        const validationSchema = role === 'GUIDE' ? registerGuideValidationZodSchema : registerTouristValidationZodSchema;
        const validation = zodValidator(payload, validationSchema);
        
        if (!validation.success) {
            console.log('Validation failed:', validation);
            return validation;
        }

        const validatedPayload: any = validation.data;

        // Prepare registration data
        const registerData: any = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            password: validatedPayload.password,
            role: validatedPayload.role,
        };

        console.log('Sending to backend:', registerData);
        

        const res = await serverFetch.post("/user/register", {
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const result = await res.json();
        console.log('Backend response:', result);

        if (result.success) {
            // Auto-login after successful registration
            await loginUser(_currentState, formData);
        }

        return result;

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error('Registration error:', error);
        return { 
            success: false, 
            message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` 
        };
    }
}