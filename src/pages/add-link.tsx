import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import { Spinner } from "../components/spinner/spinner";
import {
  CreateLinkInputType,
  createLinkValidator,
} from "../validators/create-link-validator";
import { Folder } from "../types/folder";
import { useCreateLink, useGetMyFolders } from "../utils/hooks";

const AddLink: NextPage = (props) => {
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

  const { data: folderData, isFoldersLoading } = useGetMyFolders({});
  const onSubmit: SubmitHandler<CreateLinkInputType> = (data) => {
    mutate(data);
    reset();
  };

  const selectedFolder = folderData?.length
    ? folderData?.find((folder: Folder) => folder?.id === watch("folderId"))
    : null;

  const { mutate, isLoading } = useCreateLink();

  if (isLoading || isFoldersLoading) {
    return <Spinner absolute />;
  }
  if (!folderData?.length) {
    return <p>Something went wrong</p>;
  }

  const folderOptions =
    folderData?.map((folder) => ({
      label: folder.name,
      value: folder.id,
    })) ?? [];

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
