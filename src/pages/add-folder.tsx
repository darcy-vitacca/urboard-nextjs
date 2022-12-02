import { useRouter } from "next/router";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateFolderInputType,
  createFolderValidator,
} from "../validators/create-folder-validator";
import { Input } from "../components/input/input";
import { Spinner } from "../components/spinner/spinner";
import { FC } from "react";

const AddFolder: FC<NextPage> = (props) => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<CreateFolderInputType>({
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
    resolver: zodResolver(createFolderValidator),
  });

  const { mutate, isLoading } = trpc.useMutation("protected.create-folder", {
    onSuccess: (data) => {
      reset();
      router.push(`/folder/${data?.id}`);
    },
  });

  const onSubmit: SubmitHandler<CreateFolderInputType> = (data) => {
    mutate(data);
  };
  if (isLoading) {
    return <Spinner absolute />;
  }

  return (
    <div className="mx-4 w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="prose-xl font-bold">Add Folder</h1>
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
export default AddFolder;
