import { Dispatch, FC, SetStateAction, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Folder } from "@prisma/client";
import { filterSearch } from "../filterSearch";
import { trpc } from "../trpc";

type UseFolder = {
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filteredSearchData: Folder[] | undefined;
  reorder: boolean;
  setReorder: Dispatch<SetStateAction<boolean>>;
  setReorderItems: Dispatch<SetStateAction<Folder[] | null>>;
  reorderItems: Folder[] | null;
  submitReorder: () => void;
};
export const useFolder = (): UseFolder => {
  const [reorder, setReorder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reorderItems, setReorderItems] = useState<Folder[] | null>(null);
  const router = useRouter();

  const {
    data,
    isLoading: isFoldersLoading,
    error,
  } = trpc.useQuery(["protected.get-my-folders"], {
    onSuccess(data) {
      setReorderItems(data);
    },
  });

  const { mutate, isLoading: isUpdateFoldersLoading } = trpc.useMutation(
    "protected.update-folder-order",
    {
      onSuccess: (data) => {
        router.push(`/`);
      },
    }
  );

  const isLoading = isFoldersLoading || isUpdateFoldersLoading;
  const filteredFolders =
    searchTerm !== "" ? filterSearch({ data, searchTerm }) : data;

  const submitReorder = () => {
    //TODO check if any updates between data then mutate else don't
    console.log("data", data);
    console.log("reorderItems", reorderItems);
    console.log("submited");
    setReorder(false);
    //look at old items, then check which need to be updated and only mutate those
    if (reorderItems) mutate(reorderItems);
  };

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
