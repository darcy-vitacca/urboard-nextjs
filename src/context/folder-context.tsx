import { useImmerReducer } from "use-immer";
import { createContext, Dispatch, useContext } from "react";
import { FolderAction, State } from "./folder-reducer-types";

export const initialState = {
  reorder: false,
  edit: false,
  reorderItems: undefined,
  activeFolder: undefined,
};

export const folderReducer = (state: State, action: FolderAction) => {
  console.log("action.type", action.type);
  switch (action.type) {
    case "SET_UPDATED_FOLDER_ORDER":
      state.reorderItems = action?.reorderItems;
      return;
    case "SET_UPDATED_LINKS_ORDER":
      const index =
        state.reorderItems?.findIndex(
          (folder) => folder?.id === action?.reorderItems[0]?.folderId
        ) ?? -1;

      if (index !== -1 && state.reorderItems) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        state?.reorderItems[index]?.links.splice(
          index,
          0,
          action?.reorderItems
        );
      }
      return;
    case "SET_FOLDERS":
      state.reorderItems = action?.reorderItems;
      state.reorder = false;
      return;
    case "START_REORDER":
      state.reorder = true;
      state.edit = false;
      return;
    case "STOP_REORDER":
      state.reorder = false;
      return;
    case "START_EDIT":
      state.edit = true;
      state.reorder = false;
      return;
    case "STOP_EDIT":
      state.edit = false;
      return;
    case "SET_ACTIVE_FOLDER":
      state.activeFolder = action?.activeFolder;
      return;
    default:
      return initialState;
  }
};
const StateContext = createContext<State>(initialState);

//@ts-ignore
const DispatchContext = createContext<Dispatch<FolderAction>>();

export const FolderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, folderDispatch] = useImmerReducer(folderReducer, initialState);

  return (
    <DispatchContext.Provider value={folderDispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useFolderState = () => useContext(StateContext);
export const useFolderDispatch = () => useContext(DispatchContext);
