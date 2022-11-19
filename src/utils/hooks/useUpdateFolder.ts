import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";

export const useUpdateFolder = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { mutate, isLoading: updateLoading } = trpc.useMutation(
        "protected.update-folder",
        {
            onSuccess: async () => {
                await queryClient.refetchQueries(["protected.get-my-folders"], {
                    active: false,
                    exact: true,
                    inactive: true,
                });

                router.push(`/`);
            },
        }
    );

    return { mutate, updateLoading }
}