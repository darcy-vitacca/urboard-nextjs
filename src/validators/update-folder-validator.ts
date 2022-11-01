import { z } from "zod";

export const updateFolderValidator = z.object({
    id: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    imageUrl: z.string().url().optional(),
});

export type UpdateFolderInputType = z.infer<typeof updateFolderValidator>;
