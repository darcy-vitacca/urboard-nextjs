import { createFolderValidator } from '../../validators/create-folder-validator';
import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from 'zod';
import { createLinkValidator } from '../../validators/create-link-validator';
import { handleFolderOrder } from '../../utils/fitlerOrder';
import { updateFolderValidator } from '../../validators/update-folder-validator';
import { Folder } from '../../types/folder';

const handleGetFolders = async ({ userId }: { userId: string }) => {
  const foldersOrder = await prisma.foldersOrder.findFirst({
    where: {
      userId: {
        equals: userId,
      }
    },
    select: {
      order: true,
    },
  })
  const foldersData = await prisma.folder.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    include: {
      links: true,
      linkOrders: true
    }
  });
  const order = foldersOrder?.order as string[]
    ?? undefined;

  return { foldersData, order };
}

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
  .mutation("delete-folder", {
    input: z.string(),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");
      await prisma.folder.deleteMany({
        where: {
          id: input,
          userId: ctx?.session?.user?.id,
        },
      })

      const { foldersData, order } = await handleGetFolders({
        userId: ctx?.session?.user?.id,
      });
      const folders = handleFolderOrder({ foldersData, order })
      return folders;
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
  .mutation("update-links-order", {
    input: z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      name: z.string(),
      imageUrl: z.string().nullable(),
      folderId: z.string()
    })),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");

      const linkOrder = input?.map((folder) => {
        return folder?.id
      })


      if (!input[0]?.folderId) {
        throw new Error("No Folder Id");
      }


      return await prisma.linkOrder.upsert({
        where: {
          folderId: input[0]?.folderId,
        },
        update: {
          order: linkOrder,
        },
        create: {
          order: linkOrder,
          folder: { connect: { id: input[0]?.folderId, } },
        },
      })
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

      console.log('input', input);

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
      //@ts-ignore
      const folders = handleFolderOrder({ foldersData: input, order: foldersOrder })
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
      const { foldersData, order } = await handleGetFolders({
        userId: ctx?.session?.user?.id,
      })
      const folders = handleFolderOrder({ foldersData, order })
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