import { z } from "zod";
import { cardSchema } from "./card";

export const deckSchema = z.object({
    deckId: z
        .uuid(),
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(155, "Title is too long."),
    category: z
        .string()
        .trim()
        .min(1, "Category is required.")
        .max(60, "Category is too long."),
    description: z
        .string()
        .trim()
        .length(500, "Limit is reached."),
    access: z
        .object({
            visibleTo: z.enum(['Everyone', 'Verified', 'Just Me', 'Classes']).default("Just Me"),
            editableBy: z.enum(['Just Me', 'Verified']).default("Just Me")
        }),
    cards: z
        .array(cardSchema),
});

export type Deck = z.infer<typeof deckSchema>;
