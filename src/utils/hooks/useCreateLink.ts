import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";

export const useCreateLink = ({ folderId = "" }: { folderId: string | undefined }) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isLoading } = trpc.useMutation("protected.create-link", {
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["protected.get-my-folders"],
            });
            router.push(`/folder/${folderId}`);
        },
    });

    return {
        mutate, isLoading
    }
}