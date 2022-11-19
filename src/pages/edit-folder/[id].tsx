import { useRouter } from "next/router";
import { NextPage } from "next";
import { Input } from "../../components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "../../components/spinner/spinner";
import { UpdateFolderInputType } from "../../validators/update-folder-validator";
import { useGetFolderById } from "../../utils/hooks/useGetFolderById";
import { useUpdateFolder } from "../../utils/hooks/useUpdateFolder";
import { Folder } from "../../types/folder";

const FolderPage: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  if (!id || typeof id != "string") {
    router.push("/");
  }

  const { data, isLoading, isFetching } = useGetFolderById({ id });

  if (isLoading || isFetching) {
    return <Spinner absolute />;
  }

  if (data) {
    return <FolderForm data={data} id={id} />;
  }
  return <></>;
};

const FolderForm = ({ data, id }: { data: Folder; id: string }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<UpdateFolderInputType>({
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
  });

  const { mutate, updateLoading } = useUpdateFolder();

  const onSubmit: SubmitHandler<UpdateFolderInputType> = (formData) => {
    mutate({ ...formData, id });
  };

  if (updateLoading) {
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
