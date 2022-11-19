import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";

export const useUpdateFolder = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutate, isLoading: isUpdateFoldersLoading } = trpc.useMutation(
        "protected.update-folder",
        {
            onSuccess: async () => {
                await queryClient.refetchQueries(["protected.get-my-folders"]);

                router.push(`/`);
            },
        }
    );

    return { mutate, isUpdateFoldersLoading }
}