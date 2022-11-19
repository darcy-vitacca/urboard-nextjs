import React, { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import Sidebar from "./side-bar/side-bar";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
} from "@dnd-kit/core";
import { useFolderDispatch, useFolderState } from "../context/folder-context";
import { trpc } from "../utils/trpc";
import { Spinner } from "./spinner/spinner";
import { useSensor, useSensors } from "@dnd-kit/core";
import { useQueryClient } from "react-query";
import { Folder } from "../types/folder";
import { Link } from "../types/link";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  const dispatchFolder = useFolderDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { activeFolder, activeLink } = useFolderState();

  const { mutate: mutateFolder, isLoading: foldersLoading } = trpc.useMutation(
    "protected.delete-folder",
    {
      onSuccess: (data) => {
        dispatchFolder({ type: "SET_FOLDERS", reorderItems: data });
        queryClient.invalidateQueries("protected.get-my-folders");
        router.push("/");
      },
    }
  );
  const { mutate: mutateLink, isLoading: linksLoading } = trpc.useMutation(
    "protected.delete-link",
    {
      onSuccess: (data) => {
        dispatchFolder({ type: "SET_FOLDERS", reorderItems: data });
        queryClient.invalidateQueries("protected.get-my-folders");
      },
    }
  );

  const isLoading = foldersLoading || linksLoading;

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over?.id === "edit") {
      if (event?.active?.data?.current) {
        if (event?.active?.data?.current.type === "FOLDER") {
          dispatchFolder({
            type: "SET_ACTIVE_FOLDER",
            activeFolder: undefined,
          });
          router.push(`/edit-folder/${activeFolder?.id}`);
        }
        if (event?.active?.data?.current.type === "LINK") {
          dispatchFolder({
            type: "SET_ACTIVE_LINK",
            activeLink: undefined,
          });
          router.push(`/edit-link/${activeLink?.id}`);
        }
      }
    }
    if (over?.id === "delete") {
      if (event?.active?.data?.current) {
        if (
          event?.active?.data?.current.type === "FOLDER" &&
          activeFolder?.id
        ) {
          mutateFolder(activeFolder?.id);
          dispatchFolder({
            type: "SET_ACTIVE_FOLDER",
            activeFolder: undefined,
          });
        }
        if (event?.active?.data?.current.type === "LINK" && activeLink?.id) {
          mutateLink(activeLink?.id);
          dispatchFolder({
            type: "SET_ACTIVE_LINK",
            activeLink: undefined,
          });
        }
      }
    }
  }

  function handleDragStart(event: DragStartEvent) {
    if (event?.active?.data?.current) {
      if (event?.active?.data?.current.type === "FOLDER") {
        dispatchFolder({
          type: "SET_ACTIVE_FOLDER",
          activeFolder: event.active.data.current as Folder,
        });
      }
      if (event?.active?.data?.current.type === "LINK") {
        dispatchFolder({
          type: "SET_ACTIVE_LINK",
          activeLink: event.active.data.current as Link,
        });
      }
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex min-h-screen w-full min-w-[320px] flex-row bg-gray-50">
        <Sidebar />
        <div className="mt-10  ml-20 flex w-full items-start justify-center">
          {isLoading ? <Spinner absolute /> : children}
        </div>
      </div>
    </DndContext>
  );
};

export default Layout;
