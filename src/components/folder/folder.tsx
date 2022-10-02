import Link from "next/link";
import { FC } from "react";

type IFolderCard = { name: string; folderId: string };
export const FolderCard: FC<IFolderCard> = ({ name, folderId }) => {
  return (
    <Link href={`/folder/${folderId}`}>
      <div className=" card flex h-28 w-28 cursor-pointer items-center justify-center border border-black bg-base-100 p-2 shadow-xl hover:border-2 hover:border-gray-900 md:h-48 md:w-48">
        <h1 className="text text-center text-xs font-bold md:text-xl">
          {name}
        </h1>
      </div>
    </Link>
  );
};
