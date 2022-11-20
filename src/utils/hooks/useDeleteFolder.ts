import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useFolderDispatch } from "../../context/folder-context";
import { trpc } from "../trpc";

export const useDeleteFolder = () => {
    const dispatchFolder = useFolderDispatch();
    const queryClient = useQueryClient();
    const router = useRouter();


    const { mutate: mutateFolder, isLoading: foldersLoading } = trpc.useMutation(
        "protected.delete-folder",
        {
            onSuccess: (data) => {
                dispatchFolder({ type: "SET_FOLDERS", reorderItems: data });
                queryClient.invalidateQueries({
                    queryKey: ["protected.get-my-folders"],
                }),
                    router.push("/");
            },
        }
    );

    return { mutateFolder, foldersLoading }
}