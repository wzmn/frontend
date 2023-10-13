import React from "react";
import RightBar from "components/right-bar";
import Sidebar from "components/sidebar";
import * as styles from "./styles.module.css";
import { PageProps } from "gatsby";

const routeNotToInclude = ["/login/"];

const Layout = ({ children }: PageProps) => {
  return (
    <div className="container mx-6">
      {!routeNotToInclude.includes(location?.pathname) ? (
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.children}>{children}</div>
          <RightBar />
        </div>
      ) : (
        <div className={styles.authLayout}>{children}</div>
      )}
    </div>
  );
};

export default Layout;
