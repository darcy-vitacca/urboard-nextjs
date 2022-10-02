import { createFolderValidator } from '../../validators/create-folder-validator';
import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from 'zod';


export const protectedRouter = createProtectedRouter()
  .mutation("create-folder", {
    input: createFolderValidator,
    async resolve({ input, ctx }) {

      if (!ctx?.session) throw new Error("Unauthorized");
      return await prisma.folder.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          userId: ctx?.session?.user?.id,
        },
      });
    },
  })
  .mutation("update-folder-order", {
    // input: createFolderValidator,
    async resolve({ input, ctx }) {

      if (!ctx?.session) throw new Error("Unauthorized");
      return "hit";
    },
  })
  .query("get-my-folders", {
    async resolve({ ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");
      return await prisma.folder.findMany({
        where: {
          userId: {
            equals: ctx?.session?.user?.id,
          },
        },
      });
    },
  })
  .query("get-folder-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");

      console.log('ctx.session', ctx.session);

      return await prisma.folder.findFirst({
        where: {
          AND: [
            {
              id: input.id,
            },
            {
              userId: ctx?.session?.user?.id,
            },
          ]
        },
      });
    },
  })