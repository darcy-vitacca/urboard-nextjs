import { FC } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { INavItem, navItems } from "../../constants/nav";
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
            <div className="py-4">
              <a
                href=""
                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <Tooltip tip="General" />
              </a>
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              {navItems?.map((item) => (
                <NavIcons
                  key={item?.toolTip}
                  toolTip={item?.toolTip}
                  Icon={item?.Icon}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form action="/logout">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
