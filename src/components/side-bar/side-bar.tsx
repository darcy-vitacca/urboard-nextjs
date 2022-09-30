import { FC } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { INavItem, logoutMenuItem, navItems } from "../../constants/nav";
import Link from "next/link";

type ILinkWrapper = {
  href?: string;
  children: JSX.Element | JSX.Element[];
};

const LinkWrapper = ({ href, children }: ILinkWrapper) => {
  return href ? (
    <>
      <Link href={href}>{children}</Link>
    </>
  ) : (
    <>{children}</>
  );
};

type ITooltip = { toolTip: string };
export const Tooltip: FC<ITooltip> = ({ toolTip }) => {
  return (
    <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-8 py-1.5 text-base font-medium text-white opacity-0 group-hover:opacity-100">
      {toolTip}
    </span>
  );
};

export const NavIcons: FC<INavItem> = ({ toolTip, Icon, href }) => {
  return (
    <li>
      <LinkWrapper href={href}>
        {Icon && (
          <Icon onClick={() => console.log("hit")} className="h-7 w-7 " />
        )}
        <Tooltip toolTip={toolTip} />
      </LinkWrapper>
    </li>
  );
};

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen w-16 flex-col justify-between border-r bg-white">
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
        <div className="border-t border-gray-100">
          <nav className="flex flex-col p-2">
            <ul className="space-y-1 border-t border-gray-100 pt-4">
              {navItems?.map((item) => (
                <NavIcons
                  key={item?.toolTip}
                  toolTip={item?.toolTip}
                  href={item?.href}
                  Icon={item?.Icon}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        {logoutMenuItem ? (
          <NavIcons
            toolTip={logoutMenuItem?.toolTip}
            href={logoutMenuItem?.href}
            Icon={logoutMenuItem?.Icon}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
