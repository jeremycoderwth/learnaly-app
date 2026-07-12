import { z } from "zod";

export const userSchema = z.object({
    userId: z
        .uuid(),
    username: z
        .string()
        .trim()
        .min(1, "Username is required")
        .max(60, "Username is too long."),
    email: z
        .email()
        .trim(),
    phone: z
        .string()
        .trim(),
    role: z
        .enum(['student', 'teacher', 'verified'])
        .default("verified"),
    plan: z
        .literal(['free', 'premium'])
        .default("free"),
});

export type User = z.infer<typeof userSchema>;
