import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { Folder } from "../../types/folder";

interface IFolderDnd {
  folder: Folder;
  children: React.ReactNode | React.ReactNode[];
}
export const FolderDnD: FC<IFolderDnd> = ({ folder, children }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: folder.id,
    data: folder,
  });

  const router = useRouter();

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={() => {
          if (isDragging) return;
          router.push(`/folder/${folder?.id}`);
        }}
      >
        {children}
      </div>
    </>
  );
};
