import { Folder } from "../types/folder";

export type FolderAction =
    {
        type: "SET_UPDATED_FOLDER_ORDER";
        reorderItems: Folder[] | undefined
    } |
    {
        type: "SET_FOLDERS";
        reorderItems: Folder[] | undefined
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



export type State = {
    reorder: boolean;
    reorderItems: Folder[] | undefined;
    edit: boolean;
};

