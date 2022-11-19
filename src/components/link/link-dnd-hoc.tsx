import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { Link } from "../../types/link";

interface ILinkDnd {
  link: Link;
  children: React.ReactNode | React.ReactNode[];
}
export const LinkDnD: FC<ILinkDnd> = ({ link, children }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: link.id,
    data: { ...link, type: "LINK" },
  });

  const router = useRouter();

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={() => {
          //   if (isDragging) return;
          //   router.push(`/folder/${folder?.id}`);
        }}
      >
        {children}
      </div>
    </>
  );
};
