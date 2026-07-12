import { z } from "zod";

export const cardSchema = z.object({
    cardId: z
        .uuid({ version: "v7" }),
    question: z
        .string()
        .trim()
        .min(1, "Question is required.")
        .max(255, "Question is too long."),
    correctAnswer: z
        .string()
        .trim()
        .or(z.number()),
    rating: z
        .enum(['Easy', 'Good', 'Hard']),
    tag: z
        .string()
        .trim()
        .max(15, "Tag must be shorter.")
        .default("new-card"),
    cardType: z
        .literal(['flashcard', 'quiz'])
        .default("flashcard"),
    options: z
        .array(z.string())
        .length(4, "Only 4 choices are required.")
        .optional(),
});

export type Card = z.infer<typeof cardSchema>;
