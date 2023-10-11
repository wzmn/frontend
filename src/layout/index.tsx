import React from "react";
import RightBar from "../components/right-bar";
import Sidebar from "../components/sidebar";
import * as styles from "./styles.module.css";
import { PageProps, SliceComponentProps, HeadProps } from "gatsby";

const routeNotToInclude = ["/login/"];

const Layout = ({ children }: PageProps) => {
  return (
    <>
      {!routeNotToInclude.includes(location?.pathname) ? (
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.children}>{children}</div>
          <RightBar />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
