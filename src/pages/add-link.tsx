import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import { Spinner } from "../components/spinner/spinner";
import { trpc } from "../utils/trpc";
import {
  CreateLinkInputType,
  createLinkValidator,
} from "../validators/create-link-validator";
import { Folder } from "../types/folder";

const AddLink: NextPage = (props) => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm<CreateLinkInputType>({
    defaultValues: {
      folderId: "",
      name: "",
      imageUrl: undefined,
      url: "",
    },
    resolver: zodResolver(createLinkValidator),
  });

  const { mutate, isLoading } = trpc.useMutation("protected.create-link", {
    onSuccess: (data) => {
      reset();
      router.push(`/folder/${data?.id}`);
    },
  });

  const { data: folderData, isLoading: isFoldersLoading } = trpc.useQuery(
    ["protected.get-my-folders"],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !isLoading,
    }
  );

  const onSubmit: SubmitHandler<CreateLinkInputType> = (data) => {
    mutate(data);
  };
  if (isLoading || isFoldersLoading) {
    return <Spinner absolute />;
  }
  if (!folderData?.length) {
    return <p>Something went wrong</p>;
  }

  debugger;
  const folderOptions =
    folderData?.map((folder) => ({
      label: folder.name,
      value: folder.id,
    })) ?? [];

  const selectedFolder = folderData?.length
    ? folderData?.find((folder: Folder) => folder?.id === watch("folderId"))
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="prose-xl font-bold">
        Add Link {selectedFolder ? `to ${selectedFolder?.name}` : ""}
      </h1>
      <Select
        label="Select Folder"
        error={errors?.folderId?.message}
        {...register("folderId")}
        options={folderOptions}
      />
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
export default AddLink;
