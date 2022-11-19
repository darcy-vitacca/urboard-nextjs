import { trpc } from "../trpc";

export const useGetLinkById = ({ id }: { id: string }) => {
    const { data, isLoading, isFetching } = trpc.useQuery(
        ["protected.get-link-by-id", id],
        {
            refetchOnReconnect: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
        }
    );

    return {
        data, isFetching, isLoading
    }
}