import React, { FC, ReactNode } from "react";
import Sidebar from "./side-bar/side-bar";
import { useRouter } from "next/router";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex w-full min-w-[320px] flex-row">
      <Sidebar />
      <div className="mt-10 flex w-full items-start justify-center ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
