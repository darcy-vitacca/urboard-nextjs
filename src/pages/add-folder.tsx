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
  } = useForm<CreateFolderInputType>({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
    resolver: zodResolver(createFolderValidator),
  });

  const onSubmit: SubmitHandler<CreateFolderInputType> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Add Folder</h1>
      <Input
        label="Folder Name"
        {...register("name")}
        error={errors?.name?.message}
      />

      <button className="btn mt-4" type="submit">
        Submit
      </button>
    </form>
  );
};
export default AddFolder;
