import { createFolderValidator } from '../../validators/create-folder-validator';
import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { z } from 'zod';
import { Folder, Prisma } from '@prisma/client';


export const handleOrder = ({ foldersData, order }: {
  foldersData: Folder[], order: string[] | undefined
}): Folder[] | undefined => {
  if (order) {
    foldersData.sort((a, b) => order?.indexOf(a.id) - order?.indexOf(b.id));
  }
  return foldersData
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

      console.log('data', data);

      const folders = handleOrder({ foldersData: input, order: foldersOrder })
      return folders
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

      console.log('foldersOrder', foldersOrder);


      const foldersData = await prisma.folder.findMany({
        where: {
          userId: {
            equals: ctx?.session?.user?.id,
          },
        },
      });



      const order = foldersOrder?.order as Prisma.JsonArray ?? undefined;

      const folders = handleOrder({ foldersData, order })

      console.log('folders', folders);

      return folders;
    },
  })
  .query("get-folder-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx?.session) throw new Error("Unauthorized");

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