import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateFolderInputType,
  createFolderValidator,
} from "../validators/create-folder-validator";
import { Input } from "../components/input/input";

const AddFolder = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<CreateFolderInputType>({
    defaultValues: {
      name: "",
      imageUrl: undefined,
    },
    resolver: zodResolver(createFolderValidator),
  });

  const onSubmit: SubmitHandler<CreateFolderInputType> = (data) =>
    console.log(data);

  console.log("errors", errors);
  console.log("watch()", watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="prose-xl">Add Folder</h1>
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
