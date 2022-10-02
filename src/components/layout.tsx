import React, { FC, ReactNode } from "react";
import Sidebar from "./side-bar/side-bar";
import { useRouter } from "next/router";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full min-w-[320px] flex-row bg-gray-50">
      <Sidebar />
      <div className="mt-10  ml-20 flex w-full items-start justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
