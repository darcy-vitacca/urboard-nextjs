import { useFolderDispatch } from "../../context/folder-context";
import { trpc } from "../trpc";

export const useGetMyFolders = ({ reorder = false, isLoading = false }: { reorder?: boolean, isLoading?: boolean }) => {
    const folderDispatch = useFolderDispatch();

    const { data, isLoading: isFoldersLoading } = trpc.useQuery(
        ["protected.get-my-folders"],
        {
            refetchOnReconnect: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            enabled: !reorder || !isLoading,
            onSuccess(data) {
                folderDispatch({ type: "SET_FOLDERS", reorderItems: data });
            },
        }
    );

    return {
        data,
        isFoldersLoading,
    }
}
