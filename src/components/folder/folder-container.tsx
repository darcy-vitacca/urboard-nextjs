import React, { FC, useState } from "react";
import { Folder, Link } from "@prisma/client";
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

type SortableProps = {
  filteredData: Folder[] | Link[] | undefined;
};

type SortableItem = {
  data: Folder | Link | undefined;
};
const SortableItem: FC<SortableItem> = ({ data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
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

const SortableContainer: FC<SortableProps> = ({ filteredData }) => {
  const [items, setItems] = useState<Folder[] | Link[]>(filteredData);
  const [activeId, setActiveId] = useState<string | null | UniqueIdentifier>(
    null
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return items ? (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items?.map((item) => (
          <SortableItem key={item?.id} data={item} />
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <SortableItem
            key={activeId}
            data={items?.find((item) => item?.id === activeId)}
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
      setItems((items) => {
        const oldIndex = items?.findIndex((item) => item?.id === active?.id);
        const newIndex = items?.findIndex((item) => item?.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default SortableContainer;
