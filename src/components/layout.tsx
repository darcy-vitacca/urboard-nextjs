import React, { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "./side-bar/side-bar";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
} from "@dnd-kit/core";
import { useFolderDispatch, useFolderState } from "../context/folder-context";
import { Spinner } from "./spinner/spinner";
import { useSensor, useSensors } from "@dnd-kit/core";
import { Folder } from "../types/folder";
import { Link } from "../types/link";
import { useDeleteFolder, useDeleteLink } from "../utils/hooks";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import ReactGA from "react-ga4";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  const dispatchFolder = useFolderDispatch();
  const router = useRouter();
  const { activeFolder, activeLink } = useFolderState();
  const { mutateFolder, foldersLoading } = useDeleteFolder();
  const { mutateLink, linksLoading } = useDeleteLink();

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
  const { data: session } = useSession();

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      ReactGA.send(url);
    });
    return () => {
      router.events.off("routeChangeComplete", (url) => {
        ReactGA.send(url);
      });
    };
  }, [router.events]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex min-h-screen w-full min-w-[320px] flex-row bg-gray-50">
        <Sidebar />
        <div
          className={clsx(`mt-10 flex w-full  items-start justify-center`, {
            ["ml-20"]: session?.user,
          })}
        >
          {isLoading ? <Spinner absolute /> : children}
        </div>
      </div>
    </DndContext>
  );
};

export default Layout;
