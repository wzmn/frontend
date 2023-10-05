import React from "react";
import Navbar from "./navbar";
import { useLocation } from "@reach/router";

import "../styles/global.css";
const Layout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();

  return (
    <div className="layout">
      {location.pathname !== "/login/" && <Navbar />}
      {children}
      This is a footer
    </div>
  );
};

export default Layout;
