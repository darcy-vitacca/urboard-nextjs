import React, { FC, ReactNode } from "react";
import Sidebar from "./side-bar/side-bar";

type ILayout = { children: ReactNode };

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="container">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
