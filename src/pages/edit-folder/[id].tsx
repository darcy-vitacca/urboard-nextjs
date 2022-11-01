import { useRouter } from "next/router";
import { NextPage } from "next";
import { Input } from "../../components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../../components/spinner/spinner";
import { UpdateFolderInputType } from "../../validators/update-folder-validator";
import { useQueryClient } from "react-query";

const FolderPage: NextPage = (props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  if (!id || typeof id != "string") {
    router.push("/");
  }

  const { data, isLoading, isFetching } = trpc.useQuery([
    "protected.get-folder-by-id",
    id,
  ]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdateFolderInputType>({
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
  });

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

  const onSubmit: SubmitHandler<UpdateFolderInputType> = (formData) => {
    mutate({ ...formData, id });
  };

  if (isLoading || isFetching || updateLoading) {
    return <Spinner absolute />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="prose-xl font-bold">Editing Folder: {data?.name} </h1>
      <Input
        label="Folder Name"
        error={errors?.name?.message}
        {...register("name")}
      />

      <button className="btn mt-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FolderPage;
