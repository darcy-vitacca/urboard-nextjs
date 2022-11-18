import { Folder } from "../types/folder";
import { Link } from "../types/link";



export const filterSearchFolder = ({ data, searchTerm = "" }: {
    data: Folder[] | undefined, searchTerm: string
}): Folder[] | undefined => data?.filter((searchItem) => {
    return searchItem.name.toLowerCase().includes(searchTerm.toLowerCase());
});



export const filterSearchLinks = ({ data, searchTerm = "" }: {
    data: Link[] | undefined, searchTerm: string
}): Link[] | undefined => data?.filter((searchItem) => {
    return searchItem.name.toLowerCase().includes(searchTerm.toLowerCase());
});

