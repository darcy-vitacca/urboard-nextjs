import { useFolderState } from "../../context/folder-context";
import { useFolder } from "../../utils/hooks/useFolder";
import { EditBtn } from "./edit-btn";
import { ReorderBtn } from "./reorder-btn";

export const ActionBar = () => {
  const {
    folderDispatch,
    submitReorder,
    isFoldersLoading,
    isUpdateFoldersLoading,
  } = useFolder();

  const { reorder, edit } = useFolderState();

  return (
    <div className="flex w-full flex-row justify-center">
      <ReorderBtn
        folderDispatch={folderDispatch}
        reorder={reorder}
        submitReorder={submitReorder}
        disabled={isUpdateFoldersLoading || isFoldersLoading}
        isUpdating={isUpdateFoldersLoading}
      />
      <EditBtn folderDispatch={folderDispatch} edit={edit} />
    </div>
  );
};
