import React from "react";
import RightBar from "components/right-bar";
import Sidebar from "components/sidebar";
import * as styles from "./styles.module.scss";
import { PageProps } from "gatsby";
import Navbar from "components/navbar";
import Footer from "./footer.tsx";
const routeNotToInclude = ["/login/", "/reset-password/", "/forgot-password/"];

const Layout = ({ children }: PageProps) => {
  return (
    <div className="relative mx-6">
      {!routeNotToInclude.includes(location?.pathname) ? (
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.children}>
            <Navbar />

            <div className={styles.mainContent}>{children}</div>
            <Footer />
          </div>
          <RightBar /> {/* has absolute position */}
        </div>
      ) : (
        <div className={styles.authLayout}>
          {children}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
