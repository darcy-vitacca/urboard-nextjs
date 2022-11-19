import { useRouter } from "next/router";
import { useState } from "react";

import {
  useFolderDispatch,
  useFolderState,
} from "../../context/folder-context";
import isEqual from "lodash/isEqual";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";
import { filterSearchLinks } from "../filterSearch";
import { Folder } from "../../types/folder";
import { useGetMyFolders } from "./useGetMyFolders";

interface IUseLinkProps {
  id: string;
}
export const useLinks = ({ id }: IUseLinkProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const folderDispatch = useFolderDispatch();
  const { reorder, reorderItems } = useFolderState() as {
    reorder: boolean;
    reorderItems: Folder[];
  };
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate, isLoading: isUpdateLinksLoading } = trpc.useMutation(
    "protected.update-links-order",
    {
      onSuccess: () =>
        queryClient.invalidateQueries("protected.get-my-folders"),
    }
  );

  const { data, isFoldersLoading } = useGetMyFolders({
    reorder,
    isLoading: isUpdateLinksLoading,
  });

  const currentIndex =
    reorderItems?.findIndex((folder) => folder?.id === id) ?? -1;
  const lastIndex = (reorderItems && reorderItems?.length - 1) ?? -1;
  const singleFolder = reorderItems ? reorderItems?.length <= 1 : false;

  const previousFolder = () => {
    if (currentIndex === 0 && reorderItems) {
      router.push(`/folder/${reorderItems[lastIndex]?.id}`);
    } else if (reorderItems) {
      router.push(`/folder/${reorderItems[currentIndex - 1]?.id}`);
    } else {
      router.push("/");
    }
  };
  const nextFolder = () => {
    if (currentIndex + 1 === reorderItems?.length && reorderItems) {
      router.push(`/folder/${reorderItems[0]?.id}`);
    } else if (reorderItems) {
      router.push(`/folder/${reorderItems[currentIndex + 1]?.id}`);
    } else {
      router.push("/");
    }
  };
  const folder = reorderItems?.find((folder) => folder?.id === id);

  const filteredLinks =
    searchTerm !== ""
      ? filterSearchLinks({ data: folder?.links, searchTerm })
      : folder?.links;

  const submitReorder = () => {
    if (!isEqual(reorderItems, data)) {
      if (reorderItems) {
        queryClient.setQueryData(["protected.get-my-folders"], reorderItems);
        mutate(folder?.links);
      }
    } else {
      folderDispatch({ type: "STOP_REORDER" });
    }
  };

  return {
    folder,
    nextFolder,
    previousFolder,
    singleFolder,
    filteredSearchData: filteredLinks,
    folderDispatch,
    setSearchTerm,
    searchTerm,
    submitReorder,
    isFoldersLoading,
    isUpdateLinksLoading,
  };
};
