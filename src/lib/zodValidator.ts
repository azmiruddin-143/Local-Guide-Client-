import { ZodObject } from "zod"

export const zodValidator = <T>(payload: T, schema: ZodObject<any>) => {
    const validatedPayload = schema.safeParse(payload)

    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validatedPayload.error.issues.map(issue => {
                return {
                    field: String(issue.path[0]),
                    message: issue.message,
                }
            })
        }
    }

    return {
        success: true,
        data: validatedPayload.data,
    };
}