import { FC } from "react";

type IInput = {
  label: string;
  placeholder?: string;
  error?: string;
};

export const Input: FC<IInput> = ({ label, placeholder, error, ...props }) => {
  return (
    <div className="flex w-full flex-row items-center">
      <div className="form-control w-full">
        <label className="label flex justify-between">
          <span className="label-text">{label}</span>
        </label>
        <input
          placeholder={placeholder}
          className="input input-bordered"
          {...props}
        />
        {error ? <p>{error}</p> : null}
      </div>
    </div>
  );
};
