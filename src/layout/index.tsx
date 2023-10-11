import React from "react";
import Sidebar from "../components/sidebar";
import * as styles from "./styles.module.css";
import RightBar from "../components/right-bar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.children}>{children}</div>
        <RightBar />
      </div>
    </>
  );
};

export default Layout;
