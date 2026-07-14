import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username is required.")
        .optional(),
    email: z
        .email("Please enter your valid email address.")
        .trim()
        .min(1, "Email is required."),
    password: z
        .string()
        .trim()
        .min(1, "Password is required.")
        .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {
            error: "Password has minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no space"
        }),
});

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username is required.")
        .max(155, "Username is too long."),
    email: z
        .email("Please enter your valid email address.")
        .trim()
        .min(1, "Email is required."),
    password: z
        .string()
        .trim()
        .min(1, "Password is required.")
        .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {
            error: "Password has minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no space"
        }),
    confirmPassword: z
        .string()
        .trim()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password must be matched.",
    path: ['confirmPassword']
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterCredentials = z.infer<typeof registerSchema>;
