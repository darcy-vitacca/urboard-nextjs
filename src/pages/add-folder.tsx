import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateFolderInputType,
  createFolderValidator,
} from "../validators/create-folder-validator";
import { Input } from "../components/input/input";
import { trpc } from "../utils/trpc";
import { Spinner } from "../components/spinner/spinner";
import { useRouter } from "next/router";

const AddFolder = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
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
    return <Spinner />;
  }

  return (
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
  );
};
export default AddFolder;
