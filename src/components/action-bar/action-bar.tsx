import { Dispatch, FC } from "react";
import { FolderAction } from "../../context/folder-reducer-types";
import { ReorderBtn } from "./reorder-btn";

export interface IAction {
  reorder: boolean;
  dispatch: Dispatch<FolderAction>;
  submitReorder: () => void;
  disabled: boolean;
  isUpdating: boolean;
}
export const ActionBar: FC<IAction> = ({
  dispatch,
  submitReorder,
  reorder,
  disabled,
  isUpdating,
}) => {
  return (
    <div className="flex w-full flex-row justify-center">
      <ReorderBtn
        dispatch={dispatch}
        reorder={reorder}
        submitReorder={submitReorder}
        disabled={disabled}
        isUpdating={isUpdating}
      />
    </div>
  );
};
