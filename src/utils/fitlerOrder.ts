import { Folder } from "../types/folder";
import { Link } from "../types/link";


export const handleFolderOrder = ({ data = [], order }: {
    data: Folder[] | undefined, order: string[] | undefined
}): Folder[] | undefined => {
    if (order?.length && data?.length) {
        data?.sort((a, b) => order?.indexOf(a.id) - order?.indexOf(b.id));
    }
    return data
}

export const handleLinkOrder = ({ data = [], order }: {
    data: Link[] | undefined, order: string[] | undefined
}): Link[] | undefined => {
    if (order?.length && data?.length) {
        data?.sort((a, b) => order?.indexOf(a.id) - order?.indexOf(b.id));
    }
    return data
}