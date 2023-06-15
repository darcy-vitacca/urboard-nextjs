import { FC } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { INavItem, logoutMenuItem, navItems } from "../../constants/nav";
import { LinkWrapper } from "../link-wrapper/link-wrapper";
import { useDroppable } from "@dnd-kit/core";
import { clsx } from "clsx";
import { v4 as uuid } from "uuid";

type ITooltip = { toolTip: string };
export const Tooltip: FC<ITooltip> = ({ toolTip }) => {
  return (
    <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 w-32 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-center text-base font-medium text-white opacity-0 group-hover:opacity-100">
      {toolTip}
    </span>
  );
};

export const NavIcon: FC<INavItem> = ({ toolTip, Icon, href, onClick }) => {
  return (
    <LinkWrapper href={href}>
      <li className="group group relative my-1 flex cursor-pointer justify-center rounded-xl p-2 text-white hover:bg-white">
        {Icon && (
          <Icon
            onClick={() => (onClick ? onClick() : null)}
            className="m-0 h-7 w-7 group-hover:text-gray-900 "
          />
        )}
        <Tooltip toolTip={toolTip} />
      </li>
    </LinkWrapper>
  );
};

export const DroppableNavIcon: FC<INavItem> = ({ toolTip, Icon, id }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <li
      ref={setNodeRef}
      className={clsx(
        "group group relative my-1 flex touch-none  justify-center rounded-xl p-2 text-white hover:bg-white",
        {
          ["bg-white text-slate-900"]: isOver,
        }
      )}
    >
      {Icon && <Icon className="m-0 h-7 w-7 group-hover:text-gray-900 " />}
      <Tooltip toolTip={toolTip} />
    </li>
  );
};

const Sidebar = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <div className="fixed top-0 left-0 z-50 mx-2 my-3 flex  min-h-[98%] w-16 flex-col justify-between rounded-2xl border-r bg-slate-900">
      <div>
        <div className="inline-flex h-16 w-16 items-center justify-center">
          {session?.user?.image ? (
            <Image
              className="rounded-full"
              src={session?.user?.image}
              width={30}
              height={30}
              alt="User image"
            />
          ) : null}
        </div>
        <nav className="mt-2 p-1.5">
          <ul className="flex  flex-col justify-center border-t border-gray-100 pt-4 ">
            {session?.user
              ? navItems?.map((item) => {
                  if (item?.id === "edit" || item?.id === "delete") {
                    return (
                      <DroppableNavIcon
                        key={item?.id}
                        toolTip={item?.toolTip}
                        Icon={item?.Icon}
                        id={item?.id}
                      />
                    );
                  }
                  return (
                    <NavIcon
                      key={item?.id}
                      toolTip={item?.toolTip}
                      href={item?.href}
                      Icon={item?.Icon}
                      id={item?.id}
                    />
                  );
                })
              : null}
          </ul>
        </nav>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100  p-2">
        {logoutMenuItem && session?.user ? (
          <NavIcon
            id={uuid()}
            toolTip={logoutMenuItem?.toolTip}
            href={logoutMenuItem?.href}
            Icon={logoutMenuItem?.Icon}
            onClick={() => signOut()}
          />
        ) : (
          <div className="h-8 w-8" />
        )}
      </div>
    </div>
  ) : null;
};

export default Sidebar;
