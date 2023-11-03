import React from "react";
import RightBar from "layout/right-bar";
import Sidebar from "layout/sidebar";
import * as styles from "./styles.module.scss";
import Navbar from "layout/navbar";
import Footer from "./footer.tsx";
import AuthLayout from "./auth-layout";
import SidebarContext from "providers/sidebar-provider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import useAuth from "hook/use-auth";
import AuthProvider from "providers/auth-provider";

const routeNotToInclude = ["/login/", "/reset-password/", "/forgot-password/"];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  let pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const { ProtectedRoutes, HandleRedirect } = useAuth();
  return (
    <div className="c-container">
      <AuthProvider>
        {!routeNotToInclude.includes(pathname) ? (
          <ProtectedRoutes>
            <DndProvider backend={HTML5Backend}>
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
            </DndProvider>
          </ProtectedRoutes>
        ) : (
          <HandleRedirect>
            <AuthLayout>
              <div>
                {children}
                <Footer />
              </div>
            </AuthLayout>
          </HandleRedirect>
        )}
      </AuthProvider>
    </div>
  );
};

export default Layout;
