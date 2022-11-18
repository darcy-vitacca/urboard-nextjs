import { FC } from "react";
import SearchBar from "../search/search";
import { FolderCard } from "./folder";
import SortableContainer from "./folder-container";
import { useFolder } from "../../utils/hooks/useFolder";
import { Spinner } from "../spinner/spinner";
import { ActionBar } from "../action-bar/action-bar";
import { useFolderState } from "../../context/folder-context";
import { FolderDnD } from "./folder-dnd-hoc";
import { DragOverlay } from "@dnd-kit/core";

const FolderSection: FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredSearchData,
    folderDispatch,
    isFoldersLoading,
    isUpdateFoldersLoading,
    submitReorder,
  } = useFolder();

  const { reorder, reorderItems, activeFolder } = useFolderState();

  if (isFoldersLoading) {
    return <Spinner absolute />;
  }

  return (
    <div className="mx-3 flex w-full flex-col md:mx-4">
      <div className="flex flex-wrap justify-center gap-5 ">
        <div className="mx-auto flex w-full flex-col items-center">
          {/* <UserInfo session={session} /> */}
          <SearchBar
            disabled={reorder}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredSearchData={filteredSearchData}
          />
          <ActionBar
            dispatch={folderDispatch}
            submitReorder={submitReorder}
            disabled={isUpdateFoldersLoading || isFoldersLoading}
            isUpdating={isUpdateFoldersLoading}
            reorder={reorder}
          />
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer
              filteredSearchData={filteredSearchData}
              reorderItems={reorderItems}
              dispatch={folderDispatch}
              dispatchAction="SET_UPDATED_FOLDER_ORDER"
              folder
            />
          ) : (
            <>
              {filteredSearchData?.map((folder) => {
                return (
                  <FolderDnD folder={folder} key={folder?.id}>
                    <FolderCard
                      name={folder?.name}
                      folderId={folder?.id}
                      disabled={reorder}
                    />
                  </FolderDnD>
                );
              })}
              <DragOverlay>
                {activeFolder ? (
                  <FolderCard
                    name={activeFolder?.name}
                    folderId={activeFolder?.id}
                    disabled={true}
                  />
                ) : null}
              </DragOverlay>
            </>
          )
        ) : (
          <p>No folders found</p>
        )}
      </div>
    </div>
  );
};

export default FolderSection;
