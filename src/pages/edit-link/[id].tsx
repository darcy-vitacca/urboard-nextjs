import { useRouter } from "next/router";
import { NextPage } from "next";
import { Input } from "../../components/input/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spinner } from "../../components/spinner/spinner";
import {
  CreateLinkInputType,
  createLinkValidator,
} from "../../validators/create-link-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMyFolders } from "../../utils/hooks/useGetMyFolders";
import { useUpdateLink } from "../../utils/hooks/useUpdateLink";
import { useGetLinkById } from "../../utils/hooks/useGetLinkById";
import { Link } from "../../types/link";

const LinkPage: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  if (!id || typeof id != "string") {
    router.push("/");
  }

  const { data, isLoading, isFetching } = useGetLinkById({ id });

  if (!data && (isLoading || isFetching)) {
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

  if (!folderData?.length) {
    return <p>No Folders Found</p>;
  }

  const onSubmit: SubmitHandler<CreateLinkInputType> = (formData) => {
    mutate({ ...formData, id });
  };

  if (!data && (isFoldersLoading || updateLoading)) {
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
