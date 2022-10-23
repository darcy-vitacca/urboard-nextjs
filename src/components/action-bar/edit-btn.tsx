import { Dispatch, FC } from "react";
import { clsx } from "clsx";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FolderAction } from "../../context/folder-reducer-types";

export const EditBtn: FC<{
  edit: boolean;
  folderDispatch: Dispatch<FolderAction>;
}> = ({ edit, folderDispatch }) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      onClick={() =>
        edit
          ? folderDispatch({ type: "STOP_EDIT" })
          : folderDispatch({ type: "START_EDIT" })
      }
    >
      <div
        className={clsx("flex flex-col justify-center text-center", {
          ["rounded-xl border-black "]: edit,
        })}
      >
        <PencilSquareIcon
          className={clsx("m-auto block h-6 w-6 ", {
            ["animate-bounce text-teal-400"]: edit,
          })}
        />
        <label
          htmlFor="search"
          className=" block min-w-[50px] text-xs font-bold text-gray-700"
        >
          {edit ? "Stop" : "Edit"}
        </label>
      </div>
    </button>
  );
};
