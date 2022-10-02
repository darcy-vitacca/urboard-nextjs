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
  submitReorder: () => void;
};
export const useFolder = (): UseFolder => {
  const [reorder, setReorder] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const {
    data,
    isLoading: isFoldersLoading,
    error,
  } = trpc.useQuery(["protected.get-my-folders"]);

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
    console.log("submited");
    setReorder(false);
    // mutate(data);
  };

  return {
    isLoading,
    searchTerm,
    setSearchTerm,
    filteredSearchData: filteredFolders,
    reorder,
    setReorder,
    submitReorder,
  };
};
