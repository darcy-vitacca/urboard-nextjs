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
      console.log("data", data);
      debugger;
      reset();
      router.push(`/folder/${data?.id}`);
    },
  });

  const { data, isLoading: isFoldersLoading } = trpc.useQuery(
    ["protected.get-my-folders"],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !isLoading,
      onSuccess(data) {
        console.log("data", data);
      },
    }
  );

  const onSubmit: SubmitHandler<CreateLinkInputType> = (data) => {
    mutate(data);
  };
  if (isLoading || isFoldersLoading) {
    return <Spinner absolute />;
  }

  const folderOptions =
    data?.map((folder) => ({
      label: folder.name,
      value: folder.id,
    })) ?? [];

  const selectedFolder = data?.length
    ? data?.find((folder: Folder) => folder?.id === watch("folderId"))
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
