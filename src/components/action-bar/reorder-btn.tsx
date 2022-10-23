import { Dispatch, FC } from "react";
import { clsx } from "clsx";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { FolderAction } from "../../context/folder-reducer-types";

export const ReorderBtn: FC<{
  reorder: boolean;
  folderDispatch: Dispatch<FolderAction>;
  submitReorder: () => void;
  disabled: boolean;
  isUpdating: boolean;
}> = ({ reorder, submitReorder, folderDispatch, isUpdating, disabled }) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      disabled={disabled}
      onClick={() =>
        !reorder ? folderDispatch({ type: "START_REORDER" }) : submitReorder()
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
