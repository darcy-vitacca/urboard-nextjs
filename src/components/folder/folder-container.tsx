// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Dispatch, FC, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  UniqueIdentifier,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { FolderCard } from "./folder";
import { FolderAction } from "../../context/folder-reducer-types";
import { Folder } from "../../types/folder";
import { Link } from "../../types/link";
import { LinkCard } from "../link/link";

type SortableProps = {
  filteredSearchData: Folder[] | Link[] | undefined;
  reorderItems: Folder[] | Link[] | undefined;
  dispatch: Dispatch<FolderAction>;
  dispatchAction: "SET_UPDATED_FOLDER_ORDER" | "SET_UPDATED_LINKS_ORDER";
  folder: boolean;
};

type SortableItem = {
  data: Folder | Link | undefined;
  folder?: boolean;
};
const SortableItem: FC<SortableItem> = ({ data, folder }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id: data?.id });
  if (folder && data?.name && data?.id) {
    return (
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <FolderCard
          key={data?.id}
          name={data?.name}
          folderId={data?.id}
          disabled={true}
        />
      </div>
    );
  } else if (data?.name && data?.id && "url" in data) {
    return (
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <LinkCard
          key={data?.id}
          name={data?.name}
          url={data?.url}
          linkId={data?.id}
          disabled={true}
        />
      </div>
    );
  }
  return <></>;
};

const SortableContainer: FC<SortableProps> = ({
  reorderItems,
  dispatch,
  dispatchAction,
  folder,
}) => {
  console.log({
    reorderItems,
    dispatch,
    dispatchAction,
    folder,
  });
  const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
    null
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return reorderItems ? (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext
        items={reorderItems}
        strategy={verticalListSortingStrategy}
      >
        {reorderItems?.map((item) => (
          <SortableItem key={item?.id} data={item} folder={folder} />
        ))}
      </SortableContext>
      <DragOverlay className="opacity-100">
        {activeId && reorderItems ? (
          <SortableItem
            key={activeId}
            data={reorderItems?.find((item: Folder) => item?.id === activeId)}
            folder={folder}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  ) : (
    <></>
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active?.id);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (active.id !== over?.id) {
      setActiveId(null);
      const newOrderedItems = () => {
        const oldIndex = reorderItems?.findIndex(
          (item) => item?.id === active?.id
        );
        const newIndex = reorderItems?.findIndex(
          (item) => item?.id === over?.id
        );

        const updatedArray = arrayMove(reorderItems, oldIndex, newIndex);
        return updatedArray;
      };

      dispatch({
        type: dispatchAction,
        reorderItems: newOrderedItems(),
      });
    }
  }
};

export default SortableContainer;
