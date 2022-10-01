import { z } from "zod";

export const createFolderValidator = z.object({
    name: z.string().min(5).max(100),
    imageUrl: z.string().url().optional(),
});

export type CreateFolderInputType = z.infer<typeof createFolderValidator>;
