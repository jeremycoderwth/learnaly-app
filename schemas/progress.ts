import { z } from "zod";

export const progressSchema = z.object({
    id: z
        .uuid(),
    
});

export type StudyProgress = z.infer<typeof progressSchema>;
