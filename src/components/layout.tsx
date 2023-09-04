import React from "react";
import Navbar from "./navbar";
const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      {children}
      This is a footer
    </>
  );
};

export default Layout;
