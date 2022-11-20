import { useQueryClient } from "react-query";
import { useFolderDispatch } from "../../context/folder-context";
import { trpc } from "../trpc";

export const useDeleteLink = () => {
    const dispatchFolder = useFolderDispatch();
    const queryClient = useQueryClient();


    const { mutate: mutateLink, isLoading: linksLoading } = trpc.useMutation(
        "protected.delete-link",
        {
            onSuccess: (data) => {
                dispatchFolder({ type: "SET_FOLDERS", reorderItems: data });
                queryClient.invalidateQueries({
                    queryKey: ["protected.get-my-folders"],
                });
            },
        }
    );

    return { mutateLink, linksLoading }
}