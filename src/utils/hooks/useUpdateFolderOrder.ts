import { useQueryClient } from "react-query";
import { trpc } from "../trpc";

export const useUpdateFolderOrder = () => {

    const queryClient = useQueryClient();
    const { mutate, isLoading: isUpdateFoldersLoading } = trpc.useMutation(
        "protected.update-folder-order",
        {
            onSuccess: () =>
                queryClient.invalidateQueries("protected.get-my-folders"),
        }
    );

    return {
        isUpdateFoldersLoading,
        mutate,
    }
}