import { Dispatch, FC, SetStateAction, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Folder, Prisma } from "@prisma/client";
import { filterSearch } from "../filterSearch";
import { trpc } from "../trpc";

type UseFolder = {
  isLoading: boolean;
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
  const [reorder, setReorder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reorderItems, setReorderItems] = useState<Folder[] | undefined>();

  console.log("reorderItems", reorderItems);

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
  // console.log("reorderItems", reorderItems);

  const isLoading = isFoldersLoading || isUpdateFoldersLoading;

  const filteredFolders =
    searchTerm !== "" ? filterSearch({ data: data, searchTerm }) : data;

  const submitReorder = () => {
    //TODO check if any updates between data then mutate else don't
    console.log("data", data);
    //look at old items, then check which need to be updated and only mutate those
    if (reorderItems) {
      // mutate(reorderItems);
    }
  };

  console.log("data", data);

  return {
    isLoading,
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
