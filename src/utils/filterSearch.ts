import { Link } from "../components/folder/folder-container";
import { Folder } from "./hooks/useFolder";



export const filterSearch = ({ data, searchTerm = "" }: {
    data: Folder[] | Link[] | undefined, searchTerm: string
}): Folder[] | Link[] | undefined => data?.filter((searchItem) => {
    return searchItem.name.toLowerCase().includes(searchTerm.toLowerCase());
});