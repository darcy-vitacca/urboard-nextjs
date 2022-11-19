import { Dispatch, SetStateAction, useState } from "react";
import { Folder } from "../../types/folder";

import { trpc } from "../trpc";
import { useQueryClient } from "react-query";
import isEqual from "lodash/isEqual";
import { FolderAction } from "../../context/folder-reducer-types";
import {
  useFolderDispatch,
  useFolderState,
} from "../../context/folder-context";
import { filterSearchFolder } from "../filterSearch";
import { useGetMyFolders } from "./useGetMyFolders";
import { useUpdateFolder } from "./useUpdateFolderOrder";

type UseFolder = {
  isFoldersLoading: boolean;
  isUpdateFoldersLoading: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredSearchData: Folder[] | undefined;
  submitReorder: () => void;
  folderDispatch: Dispatch<FolderAction>;
};

export const useFolder = (): UseFolder => {
  const queryClient = useQueryClient();
  const folderDispatch = useFolderDispatch();
  const { reorder, reorderItems } = useFolderState();
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate, isUpdateFoldersLoading } = useUpdateFolder();

  const { data, isFoldersLoading } = useGetMyFolders({
    reorder,
    isLoading: isUpdateFoldersLoading,
  });

  const filteredFolders =
    searchTerm !== "" ? filterSearchFolder({ data: data, searchTerm }) : data;

  const submitReorder = () => {
    if (!isEqual(reorderItems, data)) {
      if (reorderItems) {
        queryClient.setQueryData(["protected.get-my-folders"], reorderItems);
        mutate(reorderItems);
      }
    } else {
      folderDispatch({ type: "STOP_REORDER" });
    }
  };

  return {
    isFoldersLoading,
    isUpdateFoldersLoading,
    searchTerm,
    setSearchTerm,
    filteredSearchData: filteredFolders,
    submitReorder,
    folderDispatch,
  };
};
