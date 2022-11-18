import { FC } from "react";
import { clsx } from "clsx";

type IFolderCard = {
  name: string;
  folderId: string;
  disabled: boolean;
};
export const FolderCard: FC<IFolderCard> = ({ name, disabled }) => {
  return (
    <div
      className={clsx(
        "group card relative flex h-28 w-28  items-center justify-center border border-black  p-2 shadow-xl  md:h-44 md:w-44",
        {
          ["cursor-pointer transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-2 hover:border-gray-900"]:
            !disabled,
          ["animate-edit"]: disabled,
        }
      )}
    >
      <h1
        className={clsx(
          "text select-none text-center text-xs font-semibold  md:text-xl",
          {
            ["group-hover:font-bold"]: !disabled,
          }
        )}
      >
        {name}
      </h1>
    </div>
  );
};
