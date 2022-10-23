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

type SortableProps = {
  filteredSearchData: Folder[] | undefined;
  reorderItems: Folder[] | undefined;
  dispatch: Dispatch<FolderAction>;
};

type SortableItem = {
  data: Folder | undefined;
};
const SortableItem: FC<SortableItem> = ({ data }) => {
  const { attributes, listeners, setNodeRef } =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    useSortable({ id: data?.id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <FolderCard
        key={data?.id}
        name={data?.name ?? ""}
        folderId={data?.id ?? ""}
        disabled={true}
      />
    </div>
  );
};

const SortableContainer: FC<SortableProps> = ({ reorderItems, dispatch }) => {
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
          <SortableItem key={item?.id} data={item} />
        ))}
      </SortableContext>
      <DragOverlay className="opacity-100">
        {activeId && reorderItems ? (
          <SortableItem
            key={activeId}
            data={reorderItems?.find((item: Folder) => item?.id === activeId)}
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const updatedArray = arrayMove(reorderItems, oldIndex, newIndex);
        return updatedArray;
      };

      console.log("newOrderItems()", newOrderedItems());
      dispatch({
        type: "SET_UPDATED_FOLDER_ORDER",
        reorderItems: newOrderedItems(),
      });
    }
  }
};

export default SortableContainer;
