import { Dispatch, FC, SetStateAction } from "react";
import { clsx } from "clsx";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import SearchBar from "../search/search";
import { FolderCard } from "./folder";
import SortableContainer from "./folder-container";
import { Folder, Link } from "@prisma/client";

export const ReorderBtn: FC<{
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
}> = ({ reorder, setReorder }) => {
  return (
    <button
      className="mt-3 flex w-12 flex-col justify-center text-center"
      onClick={() => setReorder(!reorder)}
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

type FolderSectionProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredSearchData: Folder[] | undefined;
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
  reorderItems: Folder[] | Link[] | undefined;
  setReorderItems: Dispatch<SetStateAction<Folder[] | Link[] | undefined>>;
};
const FolderSection: FC<FolderSectionProps> = ({
  reorder,
  searchTerm,
  setSearchTerm,
  filteredSearchData,
  setReorder,
  setReorderItems,
  reorderItems,
}) => {
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
          <ReorderBtn setReorder={setReorder} reorder={reorder} />
        </div>
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer
              setReorderItems={setReorderItems}
              reorderItems={reorderItems}
            />
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
