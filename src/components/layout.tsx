import React, { FC, ReactNode } from "react";
import Sidebar from "./side-bar/side-bar";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="flex min-w-[320px] flex-row">
      <Sidebar />
      <div className="i mt-32 flex w-full items-start justify-center ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
