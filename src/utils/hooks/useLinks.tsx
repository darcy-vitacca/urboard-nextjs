import { useRouter } from "next/router";
import { useState } from "react";

import {
  useFolderDispatch,
  useFolderState,
} from "../../context/folder-context";
import { handleLinkOrder } from "../fitlerOrder";
import isEqual from "lodash/isEqual";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";
import { filterSearchLinks } from "../filterSearch";

interface IUseLinkProps {
  id: string;
}
export const useLinks = ({ id }: IUseLinkProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const folderDispatch = useFolderDispatch();
  const { reorder, reorderItems } = useFolderState();
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate, isLoading: isUpdateLinksLoading } = trpc.useMutation(
    "protected.update-links-order",
    {
      onSuccess: () =>
        queryClient.invalidateQueries("protected.get-my-folders"),
    }
  );

  const { data, isLoading: isFoldersLoading } = trpc.useQuery(
    ["protected.get-my-folders"],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !reorder && !isUpdateLinksLoading,
      onSuccess(data) {
        folderDispatch({ type: "SET_FOLDERS", reorderItems: data });
      },
    }
  );

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

  const sortedLinks = handleLinkOrder({
    data: folder?.links,
    order: folder?.linkOrders?.order ?? [],
  });

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
    sortedLinks,
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
