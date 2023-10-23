import React from "react";
import RightBar from "components/right-bar";
import Sidebar from "components/sidebar";
import * as styles from "./styles.module.scss";
import { PageProps } from "gatsby";
import Navbar from "components/navbar";
import Footer from "./footer.tsx";
import AuthLayout from "./auth-layout";
import SidebarContext from "providers/sidebar-provider";
const routeNotToInclude = ["/login/", "/reset-password/", "/forgot-password/"];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  let pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className={styles.container}>
      {!routeNotToInclude.includes(pathname) ? (
        <SidebarContext>
          <div className={`${styles.layout} `}>
            <Sidebar />
            <div className={styles.children}>
              <Navbar />

              <div className={styles.mainContent}>{children}</div>
              <Footer />
            </div>
            <RightBar /> {/* has absolute position */}
          </div>
        </SidebarContext>
      ) : (
        <AuthLayout>
          <div>
            {children}
            <Footer />
          </div>
        </AuthLayout>
      )}
    </div>
  );
};

export default Layout;
