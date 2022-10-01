import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/input/input";

export type IFormInputs = {
  name: string;
  test: string;
};

const AddFolder = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IFormInputs>({
    defaultValues: {
      name: "",
      test: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Folder</h1>
        <Input
          label="Folder Name"
          {...register("name")}
          error={errors?.name?.message}
        />
        <Input
          label="Folder Name"
          {...register("test")}
          error={errors?.test?.message}
        />
        <button
          className="btn"
          onClick={handleSubmit}
          error={errors?.name?.message}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddFolder;
