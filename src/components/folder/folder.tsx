import Link from "next/link";
import { FC } from "react";

type IFolderCard = { name: string; folderId: string; index: number };
export const FolderCard: FC<IFolderCard> = ({ name, folderId }) => {
  return (
    <Link href={`/folder/${folderId}`}>
      <div
        className="
        group
      card relative flex h-28 w-28 cursor-pointer items-center justify-center
      border border-black  p-2 shadow-xl transition 
      duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-2 hover:border-gray-900 md:h-44 md:w-44"
      >
        <h1 className="text text-center text-xs font-semibold group-hover:font-bold md:text-xl">
          {name}
        </h1>
      </div>
    </Link>
  );
};
