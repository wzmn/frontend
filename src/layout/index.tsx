import useAuth from "hook/use-auth";
import Navbar from "layout/navbar";
import RightBar from "layout/right-bar";
import Sidebar from "layout/sidebar";
import AddressLabels from "providers/address-labels";
import AppProvider from "providers/app-provider";
import AuthProvider from "providers/auth-provider";
import CompanyProvider from "providers/company-provider";
import GoogleMapProvider from "providers/google-map-provider";
import RightBarProvider from "providers/right-bar-provider";
import SidebarContext from "providers/sidebar-provider";
import UploadDocProvider from "providers/upload-doc-provider";
import React, { useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./auth-layout";
import Footer from "./footer.tsx";
import * as styles from "./styles.module.scss";

const routeNotToInclude = ["/login/", "/change-password/", "/forgot-password/"];

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  const alertIfOnline = () => toast.success("Connection restored");
  const alertIfOffline = () =>
    toast.warn("Oops! It seems like you're currently offline.");
  useEffect(() => {
    window.addEventListener("offline", () => alertIfOffline);
    window.addEventListener("online", () => alertIfOnline);
    return () => {
      window.removeEventListener("offline", () => alertIfOffline);
      window.removeEventListener("online", () => alertIfOnline);
    };
  }, []);
  let pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const { ProtectedRoutes, HandleRedirect } = useAuth();
  // const { isLoaded } = useMapContext();

  return (
    <AuthProvider>
      <>
        {!routeNotToInclude.includes(pathname) ? (
          <div className="c-container">
            <AppProvider>
              <CompanyProvider>
                <AddressLabels>
                  <UploadDocProvider>
                    <ProtectedRoutes>
                      <GoogleMapProvider>
                        <DndProvider backend={HTML5Backend}>
                          <RightBarProvider>
                            <SidebarContext>
                              <>
                                <div className={`${styles.layout} `}>
                                  <Sidebar />
                                  <div className={styles.children}>
                                    <div className={styles.mainContent}>
                                      <Navbar />
                                      {children}
                                      {/* <Footer /> */}
                                    </div>
                                  </div>
                                  <RightBar /> {/* has absolute position */}
                                </div>
                                {/* <ConfirmDialog /> */}
                              </>
                            </SidebarContext>
                          </RightBarProvider>
                        </DndProvider>
                      </GoogleMapProvider>
                    </ProtectedRoutes>
                  </UploadDocProvider>
                </AddressLabels>
              </CompanyProvider>
            </AppProvider>
          </div>
        ) : (
          <div className="">
            <HandleRedirect>
              <AuthLayout>
                <div className="flex flex-column">
                  <div className="items-center flex-1 flex justify-center">
                    {children}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img style={{ maxWidth: 199 }} src="/assets/logo.png" />
                    <Footer />
                  </div>
                </div>
              </AuthLayout>
            </HandleRedirect>
          </div>
        )}

        <ToastContainer />
      </>
    </AuthProvider>
  );
};

export default Layout;
