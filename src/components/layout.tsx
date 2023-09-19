import React from "react";
import Navbar from "./navbar";
import "../styles/global.css";
const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
      This is a footer
    </div>
  );
};

export default Layout;
