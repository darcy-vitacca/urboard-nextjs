import { FC } from "react";
import SearchBar from "../search/search";
import { Spinner } from "../spinner/spinner";
import { ActionBar } from "../action-bar/action-bar";
import { useFolderState } from "../../context/folder-context";
import { useLinks } from "../../utils/hooks/useLinks";
import { LinkCard } from "./link";
import SortableContainer from "../folder/folder-container";
import { Link } from "../../types/link";
import { LinkDnD } from "./link-dnd-hoc";
import { DragOverlay } from "@dnd-kit/core";

interface ILinkSection {
  id: string;
}

const LinkSection: FC<ILinkSection> = ({ id }) => {
  const {
    folder,
    nextFolder,
    previousFolder,
    singleFolder,
    searchTerm,
    setSearchTerm,
    filteredSearchData,
    folderDispatch,
    isFoldersLoading,
    isUpdateLinksLoading,
    submitReorder,
    isFoldersFetching,
  } = useLinks({ id });

  const { reorder, activeLink } = useFolderState();

  console.log("isFoldersLoading", isFoldersLoading);

  if (isFoldersLoading || isFoldersFetching) {
    return <Spinner absolute />;
  }

  return (
    <div className="mx-3 flex w-full flex-col md:mx-4">
      <div className="mx-auto flex w-full flex-col items-center">
        <h1 className="font-bold">Folder {folder?.name}</h1>
        <div className="flex flex-row justify-center"></div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center">
        <SearchBar
          disabled={reorder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSearchData={filteredSearchData}
        />
        <div className="mt-2 flex flex-row items-end">
          <button
            className="btn mr-4 w-24"
            type="button"
            onClick={previousFolder}
            disabled={singleFolder}
          >
            Previous
          </button>
          <ActionBar
            dispatch={folderDispatch}
            submitReorder={submitReorder}
            reorder={reorder}
            disabled={isUpdateLinksLoading || isFoldersLoading}
            isUpdating={isUpdateLinksLoading}
          />
          <button
            className="btn ml-4 w-24"
            type="button"
            onClick={nextFolder}
            disabled={singleFolder}
          >
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5 ">
        <div className="flex-start flex w-full flex-row justify-center"></div>
        {filteredSearchData?.length ? (
          reorder ? (
            <SortableContainer
              filteredSearchData={filteredSearchData}
              reorderItems={folder?.links}
              dispatch={folderDispatch}
              dispatchAction="SET_UPDATED_LINKS_ORDER"
              folder={false}
            />
          ) : (
            <>
              {filteredSearchData?.map((link: Link) => {
                return (
                  <LinkDnD link={link} key={link?.id}>
                    <LinkCard
                      name={link?.name}
                      url={link?.url}
                      linkId={link?.id}
                      disabled={reorder}
                    />
                  </LinkDnD>
                );
              })}
              <DragOverlay>
                {activeLink ? (
                  <LinkCard
                    name={activeLink?.name}
                    url={activeLink?.url}
                    linkId={activeLink?.id}
                    disabled={reorder}
                  />
                ) : null}
              </DragOverlay>
            </>
          )
        ) : (
          <p>No links found</p>
        )}
      </div>
    </div>
  );
};

export default LinkSection;
