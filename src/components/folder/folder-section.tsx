import { Dispatch, FC, SetStateAction } from "react";
import { clsx } from "clsx";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import SearchBar from "../search/search";
import { FolderCard } from "./folder";
import SortableContainer from "./folder-container";
import { Folder, Link } from "@prisma/client";
import { useFolder } from "../../utils/hooks/useFolder";

export const ReorderBtn: FC<{
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
  submitReorder: () => void;
}> = ({ reorder, setReorder, submitReorder }) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      onClick={() => (!reorder ? setReorder(true) : submitReorder())}
    >
      <div
        className={clsx("flex flex-col justify-center text-center", {
          ["rounded-xl border-black"]: reorder,
        })}
      >
        <ArrowPathRoundedSquareIcon
          className={clsx("m-auto block h-6 w-6 ", {
            ["animate-spin text-teal-400"]: reorder,
          })}
        />
        <label
          htmlFor="search"
          className=" block min-w-[50px] text-xs font-bold text-gray-700"
        >
          {reorder ? "Save" : "Reorder"}
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
  } = useFolder();
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
          />
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer filteredSearchData={filteredSearchData} />
          ) : (
            filteredSearchData?.map((folder, index) => (
              <FolderCard
                key={folder?.id}
                name={folder?.name}
                folderId={folder?.id}
                index={index}
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
