import { createFolderValidator } from '../../validators/create-folder-validator';
import { createRouter } from "./context";

export const folderRouter = createRouter()
    .mutation("create-folder", {
        input: createFolderValidator,
        async resolve({ input }) {

            // if (!ctx?.token) throw new Error("Unauthorized");
            // return await prisma.pollQuestion.create({
            //   data: {
            //     question: input.question,
            //     options: input.options,
            //     ownerToken: ctx.token,
            //   },
            // });
        },
    })