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
import UploadDocProvider from "providers/upload-doc-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routeNotToInclude = ["/login/", "/reset-password/", "/forgot-password/"];

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  let pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const { ProtectedRoutes, HandleRedirect } = useAuth();
  return (
    <AuthProvider>
      <>
        <UploadDocProvider>
          {!routeNotToInclude.includes(pathname) ? (
            <div className="c-container">
              <ProtectedRoutes>
                <DndProvider backend={HTML5Backend}>
                  <SidebarContext>
                    <div className={`${styles.layout} `}>
                      <Sidebar />
                      <div className={styles.children}>
                        <div className={styles.mainContent}>
                          <Navbar />
                          {children}
                          <Footer />
                        </div>
                      </div>
                      <RightBar /> {/* has absolute position */}
                    </div>
                  </SidebarContext>
                </DndProvider>
              </ProtectedRoutes>
            </div>
          ) : (
            <div className="">
              <HandleRedirect>
                <AuthLayout>
                  <div className="flex">
                    <div className="items-center flex-1 flex">{children}</div>
                    <div>
                      <Footer />
                    </div>
                  </div>
                </AuthLayout>
              </HandleRedirect>
            </div>
          )}
        </UploadDocProvider>
        <ToastContainer />
      </>
    </AuthProvider>
  );
};

export default Layout;
