import React, { Dispatch, FC, SetStateAction, useState } from "react";
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
import { Folder } from "../../utils/hooks/useFolder";

export type Link = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  folderId: string;
  userId: string;
  name: string;
  imageUrl: string | null;
  url: string;
};

type SortableProps = {
  filteredSearchData: Folder[] | undefined;
  reorderItems: Folder[] | Link[] | undefined;
  setReorderItems: Dispatch<SetStateAction<Folder[] | Link[] | undefined>>;
};

type SortableItem = {
  data: Folder | Link | undefined;
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

const SortableContainer: FC<SortableProps> = ({
  reorderItems,
  setReorderItems,
}) => {
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
        {activeId ? (
          <SortableItem
            key={activeId}
            data={reorderItems?.find((item) => item?.id === activeId)}
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
      setReorderItems((items) => {
        const oldIndex = items?.findIndex((item) => item?.id === active?.id);
        const newIndex = items?.findIndex((item) => item?.id === over?.id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const updatedArray = arrayMove(items, oldIndex, newIndex);
        return updatedArray;
      });
    }
  }
};

export default SortableContainer;
