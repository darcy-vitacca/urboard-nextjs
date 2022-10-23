import { FC } from "react";
import SearchBar from "../search/search";
import { FolderCard } from "./folder";
import SortableContainer from "./folder-container";
import { useFolder } from "../../utils/hooks/useFolder";
import { Spinner } from "../spinner/spinner";
import { ActionBar } from "../action-bar/action-bar";
import { useFolderState } from "../../context/folder-context";

const FolderSection: FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    filteredSearchData,
    folderDispatch,
    isFoldersLoading,
  } = useFolder();

  const { reorder, reorderItems } = useFolderState();

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
          <ActionBar />
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer
              filteredSearchData={filteredSearchData}
              reorderItems={reorderItems}
              dispatch={folderDispatch}
            />
          ) : (
            filteredSearchData?.map((folder) => (
              <FolderCard
                key={folder?.id}
                name={folder?.name}
                folderId={folder?.id}
                disabled={reorder}
              />
            ))
          )
        ) : (
          <p>No folders found</p>
        )}
      </div>
    </div>
  );
};

export default FolderSection;
