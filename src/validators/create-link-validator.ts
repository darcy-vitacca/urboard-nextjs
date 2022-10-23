import { z } from "zod";

export const createLinkValidator = z.object({
    name: z.string().min(1).max(100),
    folderId: z.string().min(1).max(100),
    imageUrl: z.string().url().optional(),
    url: z.string().url().min(1),
});

export type CreateLinkInputType = z.infer<typeof createLinkValidator>;
