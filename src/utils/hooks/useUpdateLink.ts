import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";

export const useUpdateLink = ({ folderId }: { folderId: string }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isLoading: updateLoading } = trpc.useMutation(
        "protected.update-link",
        {
            onSuccess: async () => {
                queryClient.refetchQueries(["protected.get-my-folders"]);
                router.push(`/folder/${folderId ?? ""}`);
            },
        }
    );


    return { mutate, updateLoading }

}