import { FC } from "react";
import { clsx } from "clsx";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { IAction } from "./action-bar";

export const ReorderBtn: FC<IAction> = ({
  reorder,
  submitReorder,
  dispatch,
  isUpdating,
  disabled,
}) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      disabled={disabled}
      onClick={() =>
        !reorder ? dispatch({ type: "START_REORDER" }) : submitReorder()
      }
    >
      <div
        className={clsx("flex flex-col justify-center text-center", {
          ["rounded-xl border-black"]: reorder,
        })}
      >
        <ArrowPathRoundedSquareIcon
          className={clsx("m-auto block h-6 w-6 ", {
            ["animate-spin text-teal-400"]: reorder || isUpdating,
          })}
        />
        <label
          htmlFor="search"
          className=" block min-w-[50px] text-xs font-bold text-gray-700"
        >
          {isUpdating ? "Saving" : reorder ? "Save" : "Reorder"}
        </label>
      </div>
    </button>
  );
};
