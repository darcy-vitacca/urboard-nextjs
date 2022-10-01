import React, { FC, ReactNode } from "react";
import Sidebar from "./side-bar/side-bar";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex w-full items-center justify-center">{children}</div>
    </div>
  );
};

export default Layout;
