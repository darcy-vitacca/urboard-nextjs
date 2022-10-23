import { forwardRef } from "react";

interface ISelectOptions {
  label: string;
  value: string;
}

type ISelectProps = {
  label: string;
  placeholder?: string;
  error?: string;
  options: ISelectOptions[];
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ name, label, error, options, ...props }, ref) => {
    return (
      <div className="flex w-full flex-row items-center">
        <div className="form-control w-full">
          <label className="label flex justify-between">
            <span className="label-text">{label}</span>
          </label>
          <select
            className="input input-bordered"
            ref={ref}
            name={name}
            {...props}
          >
            <option value="">Select...</option>
            {options?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error ? <p className="mt-1 text-red-400">{error}</p> : null}
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
