import { createFolderValidator } from '../../validators/create-folder-validator';
import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from 'zod';
import { createLinkValidator } from '../../validators/create-link-validator';
import { handleFolderOrder } from '../../utils/fitlerOrder';
import { updateFolderValidator } from '../../validators/update-folder-validator';


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
  .mutation("create-link", {
    input: createLinkValidator,
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");
      return await prisma.link.create({
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
          url: input.url,
          userId: ctx?.session?.user?.id,
          folderId: input.folderId,
        },
      });
    },
  })
  .mutation("update-folder-order", {
    input: z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
      name: z.string(),
      imageUrl: z.string().nullable(),
    })),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");

      const foldersOrder = input?.map((folder) => {
        return folder?.id
      })

      const data = await prisma.foldersOrder.update({
        where: {
          userId: ctx?.session?.user?.id
        },
        data: {
          order: foldersOrder,
        },
      })

      const folders = handleFolderOrder({ data: input, order: foldersOrder })
      return folders
    },
  })
  .mutation("update-folder", {
    input: updateFolderValidator,
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");
      return await prisma.folder.updateMany({
        where: {
          id: input?.id,
          userId: ctx?.session?.user?.id,
        },
        data: {
          name: input.name,
          imageUrl: input.imageUrl,
        },
      })


    },
  })
  .query("get-my-folders", {
    async resolve({ ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");
      const foldersOrder = await prisma.foldersOrder.findFirst({
        where: {
          userId: {
            equals: ctx?.session?.user?.id,
          }
        },
        select: {
          order: true,
        },
      })
      const foldersData = await prisma.folder.findMany({
        where: {
          userId: {
            equals: ctx?.session?.user?.id,
          },
        },
        include: {
          links: true,
          linkOrders: true
        }
      });
      const order = foldersOrder?.order as string[]
        //  as Prisma.JsonArray 
        ?? undefined;
      const folders = handleFolderOrder({ data: foldersData, order })
      return folders;
    },
  })
  .query("get-folder-by-id", {
    input: z.string(),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");

      return await prisma.folder.findFirst({
        where: {
          AND: [
            {
              id: input
            },
            {
              userId: ctx?.session?.user?.id,
            },
          ]
        },
      });
    },
  })