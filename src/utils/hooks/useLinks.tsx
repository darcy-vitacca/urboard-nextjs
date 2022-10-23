import { useRouter } from "next/router";
import { useFolderState } from "../../context/folder-context";
import { handleLinkOrder } from "../fitlerOrder";

interface IUseLinkProps {
  id: string;
}
export const useLinks = ({ id }: IUseLinkProps) => {
  const router = useRouter();
  const { reorderItems } = useFolderState();
  console.log("reorderItems", reorderItems);

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
    if (currentIndex === reorderItems?.length && reorderItems) {
      router.push(`/folder/${reorderItems[0]?.id}`);
    } else if (reorderItems) {
      router.push(`/folder/${reorderItems[currentIndex + 1]?.id}`);
    } else {
      router.push("/");
    }
  };
  const folder = reorderItems?.find((folder) => folder?.id === id);

  console.log("folder", folder);

  console.log("folder?.linkOrders?.order", folder?.linkOrders?.order);

  const sortedLinks = handleLinkOrder({
    data: folder?.links,
    order: folder?.linkOrders?.order ?? [],
  });

  return { folder, sortedLinks, nextFolder, previousFolder, singleFolder };
};
