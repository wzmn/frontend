import React, { useEffect } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleMapProvider, {
  useMapContext,
} from "providers/google-map-provider";
import AppProvider from "providers/app-provider";
import AddressLabels from "providers/address-labels";
import RightBarProvider from "providers/right-bar-provider";
import CompanyProvider from "providers/company-provider";
import UserIdentifyer from "services/user-identifyer";

const routeNotToInclude = ["/login/", "/change-password/", "/forgot-password/"];

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  const alertIfOnline = () => toast.success("Connection restored");
  const alertIfOffline = () =>
    toast.warn("Oops! It seems like you're currently offline.");
  useEffect(() => {
    Notification.requestPermission();
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
