import { Folder } from "../types/folder";
import { Link } from "../types/link";

export type FolderAction =
    {
        type: "SET_UPDATED_FOLDER_ORDER";
        reorderItems: Folder[];
    } |
    {
        type: "SET_UPDATED_LINKS_ORDER";
        reorderItems: Link[];
    } |
    {
        type: "SET_FOLDERS";
        reorderItems: Folder[];
    } |
    {
        type: "STOP_REORDER";
    } |
    {
        type: "START_REORDER";
    } |
    {
        type: "START_EDIT";
    }
    |
    {
        type: "STOP_EDIT";
    }
    |
    {
        type: "SET_ACTIVE_FOLDER";
        activeFolder: Folder | undefined;
    }




export type State = {
    reorder: boolean;
    reorderItems: Folder[] | Link[] | undefined;
    edit: boolean;
    activeFolder: Folder | undefined;
};

