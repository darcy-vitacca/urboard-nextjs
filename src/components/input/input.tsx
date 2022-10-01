import React from "react";

type IInputProps = {
  label: string;
  placeholder?: string;
  error?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

//Had to use a forwardRef because rhf register spread was losing the ref
export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ name, label, error, ...props }, ref) => {
    return (
      <div className="flex w-full flex-row items-center">
        <div className="form-control w-full">
          <label className="label flex justify-between">
            <span className="label-text">{label}</span>
          </label>
          <input
            className="input input-bordered"
            type="text"
            ref={ref}
            name={name}
            {...props}
          />
          {error ? <p className="mt-1 text-red-400">{error}</p> : null}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
