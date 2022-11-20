import { useRouter } from "next/router";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { Input } from "../../components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "../../components/spinner/spinner";
import {
  CreateLinkInputType,
  createLinkValidator,
} from "../../validators/create-link-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "../../types/link";
import {
  useGetLinkById,
  useGetMyFolders,
  useUpdateLink,
} from "../../utils/hooks";

const LinkPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, isLoading, isFetching } = useGetLinkById({ id });
  const loading = isLoading || isFetching;

  if (loading) {
    return <Spinner absolute />;
  }

  if (data) {
    return <LinkForm data={data} id={id} />;
  }

  return <></>;
};

const LinkForm = ({ data, id }: { data: Link; id: string }) => {
  const { data: folderData, isFoldersLoading } = useGetMyFolders({});

  const { mutate, updateLoading } = useUpdateLink({ folderId: data?.folderId });
  const isLoading = isFoldersLoading || updateLoading;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateLinkInputType>({
    defaultValues: {
      folderId: data?.folderId ?? "",
      name: data?.name ?? "",
      imageUrl: data?.imageUrl ?? undefined,
      url: data?.url ?? "",
    },
    resolver: zodResolver(createLinkValidator),
  });

  const onSubmit: SubmitHandler<CreateLinkInputType> = (formData) => {
    mutate({ ...formData, id });
  };

  if (isLoading) {
    return <Spinner absolute />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="prose-xl font-bold">Editing Link: {data?.name} </h1>
      <Input
        label="Link Name"
        error={errors?.name?.message}
        {...register("name")}
      />
      <Input label="URL" error={errors?.url?.message} {...register("url")} />

      <button className="btn mt-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LinkPage;

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
