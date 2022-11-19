import { useRouter } from "next/router";
import { trpc } from "../trpc";

export const useCreateLink = () => {
    const router = useRouter();

    const { mutate, isLoading } = trpc.useMutation("protected.create-link", {
        onSuccess: (data) => {
            router.push(`/folder/${data?.id}`);
        },
    });

    return {
        mutate, isLoading
    }
}