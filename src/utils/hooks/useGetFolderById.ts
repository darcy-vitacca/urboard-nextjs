import { trpc } from "../trpc";

export const useGetFolderById = ({ id }: { id: string }) => {
    const { data, isLoading, isFetching } = trpc.useQuery([
        "protected.get-folder-by-id",
        id,
    ],
        {
            refetchOnMount: true
        });


    return { data, isLoading, isFetching }
}