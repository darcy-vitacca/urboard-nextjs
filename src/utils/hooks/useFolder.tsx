import { Dispatch, SetStateAction, useState } from "react";
import { Folder } from "../../types/folder";
import { filterSearch } from "../filterSearch";
import { trpc } from "../trpc";
import { useQueryClient } from "react-query";
import isEqual from "lodash/isEqual";
import { FolderAction } from "../../context/folder-reducer-types";
import {
  useFolderDispatch,
  useFolderState,
} from "../../context/folder-context";

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

  const { mutate, isLoading: isUpdateFoldersLoading } = trpc.useMutation(
    "protected.update-folder-order",
    {
      onSuccess: (data) => {
        folderDispatch({
          type: "SET_UPDATED_FOLDER_ORDER",
          reorderItems: data,
        });
      },
    }
  );

  const { data, isLoading: isFoldersLoading } = trpc.useQuery(
    ["protected.get-my-folders"],
    {
      refetchOnReconnect: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !reorder || !isUpdateFoldersLoading,
      onSuccess(data) {
        folderDispatch({ type: "SET_FOLDERS", reorderItems: data });
      },
    }
  );

  const filteredFolders =
    searchTerm !== "" ? filterSearch({ data: data, searchTerm }) : data;

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
