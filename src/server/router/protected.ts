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
    //TODO add validator extract to one place
    input: z.array(z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
      name: z.string(),
      imageUrl: z.string().nullable(),
      index: z.number(),
      links: z.array(z.object({
        //TODO extract validator to once place
      }))
    })),
    async resolve({ input, ctx }) {
      console.log('input', input);


      if (!ctx?.session) throw new Error("Unauthorized");

      return prisma.$transaction(
        input.map((cur, idx) =>
          prisma.folder.upsert({
            where: { id: cur.id },
            update: { ...cur, index: idx },
            create: {}
          })
        )
      );
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