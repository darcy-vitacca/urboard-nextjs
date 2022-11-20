import { useDraggable } from "@dnd-kit/core";
import { FC } from "react";
import { Link } from "../../types/link";

interface ILinkDnd {
  link: Link;
  children: React.ReactNode | React.ReactNode[];
}
export const LinkDnD: FC<ILinkDnd> = ({ link, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: link.id,
    data: { ...link, type: "LINK" },
  });

  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners}>
        {children}
      </div>
    </>
  );
};
