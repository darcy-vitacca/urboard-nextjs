import { Dispatch, FC, SetStateAction } from "react";
import { clsx } from "clsx";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import SearchBar from "../search/search";
import { FolderCard } from "./folder";
import SortableContainer from "./folder-container";
import { useFolder } from "../../utils/hooks/useFolder";
import { Spinner } from "../spinner/spinner";

export const ReorderBtn: FC<{
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
  submitReorder: () => void;
  disabled: boolean;
  isUpdating: boolean;
}> = ({ reorder, setReorder, submitReorder, isUpdating, disabled }) => {
  console.log("isUpdating", isUpdating);
  console.log("disabled", disabled);

  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      disabled={disabled}
      onClick={() => (!reorder ? setReorder(true) : submitReorder())}
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

const FolderSection: FC = () => {
  const {
    reorder,
    searchTerm,
    setSearchTerm,
    filteredSearchData,
    setReorder,
    submitReorder,
    reorderItems,
    setReorderItems,
    isFoldersLoading,
    isUpdateFoldersLoading,
  } = useFolder();

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
          <ReorderBtn
            setReorder={setReorder}
            reorder={reorder}
            submitReorder={submitReorder}
            disabled={isUpdateFoldersLoading || isFoldersLoading}
            isUpdating={isUpdateFoldersLoading}
          />
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer
              filteredSearchData={filteredSearchData}
              reorderItems={reorderItems}
              setReorderItems={setReorderItems}
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
