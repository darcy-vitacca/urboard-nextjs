import { useRouter } from "next/router";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { Input } from "../../components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "../../components/spinner/spinner";
import { UpdateFolderInputType } from "../../validators/update-folder-validator";
import { Folder } from "../../types/folder";
import { useGetFolderById, useUpdateFolder } from "../../utils/hooks";

const FolderPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isLoading, isFetching } = useGetFolderById({ id });
  const loading = isLoading || isFetching;

  if (loading) {
    return <Spinner absolute />;
  }

  if (data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  const { mutate, isUpdateFoldersLoading } = useUpdateFolder();

  const onSubmit: SubmitHandler<UpdateFolderInputType> = (formData) => {
    mutate({ ...formData, id });
  };

  if (isUpdateFoldersLoading) {
    return <Spinner absolute />;
  }

  return (
    <div className="mx-4 w-full max-w-lg">
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
    </div>
  );
};

export default FolderPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
