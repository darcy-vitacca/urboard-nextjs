import { z } from "zod";

export const updateLinkValidator = z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    // folderId: z.string().min(1).max(100),
    imageUrl: z.string().url().optional(),
    url: z.string().url().min(1),
});

export type UpdateLinkInputType = z.infer<typeof updateLinkValidator>;
