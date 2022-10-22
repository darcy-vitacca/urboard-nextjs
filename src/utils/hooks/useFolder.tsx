import { Dispatch, SetStateAction, useState } from "react";
import { filterSearch } from "../filterSearch";
import { trpc } from "../trpc";
import { useQueryClient } from "react-query";
import isEqual from "lodash/isEqual";

export type Folder = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  name: string;
  imageUrl: string | null;
};

type UseFolder = {
  isFoldersLoading: boolean;
  isUpdateFoldersLoading: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredSearchData: Folder[] | undefined;
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
  setReorderItems: Dispatch<SetStateAction<Folder[] | undefined>>;
  reorderItems: Folder[] | undefined;
  submitReorder: () => void;
};
export const useFolder = (): UseFolder => {
  const queryClient = useQueryClient();
  const [reorder, setReorder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reorderItems, setReorderItems] = useState<Folder[] | undefined>();

  const { mutate, isLoading: isUpdateFoldersLoading } = trpc.useMutation(
    "protected.update-folder-order",
    {
      onSuccess: (data) => {
        setReorderItems(data);
        setReorder(false);
      },
    }
  );

  const { data, isLoading: isFoldersLoading } = trpc.useQuery(
    ["protected.get-my-folders"],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !reorder || !isUpdateFoldersLoading,
      onSuccess(data) {
        setReorderItems(data);
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
      setReorder(false);
    }
  };

  return {
    isFoldersLoading,
    isUpdateFoldersLoading,
    searchTerm,
    setSearchTerm,
    filteredSearchData: filteredFolders,
    reorder,
    setReorder,
    submitReorder,
    reorderItems,
    setReorderItems,
  };
};
