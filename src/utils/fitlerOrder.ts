import { Folder, LinkOrder } from "../types/folder";
import { Link } from "../types/link";


export const handleFolderOrder = ({ foldersData = [], order }: {
    foldersData: Folder[] | undefined, order: string[] | undefined
}): Folder[] => {
    if (order?.length && foldersData.length) {
        foldersData?.sort((a, b) => order?.indexOf(a.id) - order?.indexOf(b.id));
    }
    const data = foldersData?.map((folder: Folder) => {
        if (folder?.links?.length && folder?.linkOrders[0]?.order) {
            return {
                ...folder,
                links: handleLinkOrder({ data: folder?.links, order: folder?.linkOrders[0]?.order })
            }
        } else {
            return folder;
        }
    });
    return data as Folder[];
}

export const handleLinkOrder = ({ data = [], order }: {
    data: Link[] | undefined, order: string[] | undefined
}): Link[] | undefined => {
    if (data && order && order?.length && data?.length) {

        data?.sort((a, b) => order?.indexOf(a?.id) - order?.indexOf(b?.id));
    }
    return data
}