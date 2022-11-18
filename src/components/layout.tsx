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

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  const dispatchFolder = useFolderDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { activeFolder } = useFolderState();

  const { mutate, isLoading } = trpc.useMutation("protected.delete-folder", {
    onSuccess: (data) => {
      queryClient.setQueryData(["protected.get-my-folders"], data);
      router.push("/");
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    if (over?.id === "edit") {
      dispatchFolder({
        type: "SET_ACTIVE_FOLDER",
        activeFolder: undefined,
      });
      router.push(`/edit-folder/${activeFolder?.id}`);
    }
    if (over?.id === "delete" && activeFolder?.id) {
      mutate(activeFolder?.id);
    }
    dispatchFolder({
      type: "SET_ACTIVE_FOLDER",
      activeFolder: undefined,
    });
  }

  function handleDragStart(event: DragStartEvent) {
    if (event?.active?.data?.current) {
      dispatchFolder({
        type: "SET_ACTIVE_FOLDER",
        activeFolder: event.active.data.current as Folder,
      });
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
