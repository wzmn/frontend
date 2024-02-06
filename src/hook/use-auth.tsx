import React from "react";
import { PageProps, navigate } from "gatsby";
import { useAuthContext } from "providers/auth-provider";
import { userAccessRouter } from "providers/auth-provider/user-page-permissions";

type Props = {
  children: JSX.Element;
};

const useAuth = () => {
  const ProtectedRoutes = ({ children }: Props) => {
    const { userAuth, companyAuth } = useAuthContext();

    // console.log("Helo World", companyAuth?.company_verified);
    if (!userAuth) {
      if (typeof window !== "undefined")
        if (!location.pathname.match(/login/)) {
          typeof window !== "undefined" &&
            navigate(`/login/`, { replace: true });
          // typeof window !== "undefined" && navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
        }
      return null;
    }

    if (
      userAuth?.emp?.role === "Owner" &&
      companyAuth?.company_verified === false
    ) {
      typeof window !== "undefined" && navigate("/upload-company-details");
      return null;
    }

    // if (!userAccessRouter().some((val) => val + "/" === location.pathname))
    //   typeof window !== "undefined" && navigate(userAccessRouter()[0] || "");

    // if (!companyAuth?.company_verified) {
    //   typeof window !== "undefined" && navigate("/upload-company-details");
    //   // return null;
    // }
    return <>{children}</>;
  };

  const HandleRedirect = ({ children }: Props) => {
    const { userAuth, companyAuth } = useAuthContext();
    if (!!userAuth) {
      // If user is logged in then redirect to dashboard or navigate to a redirect from login
      // if (location.search.match(/\?redirect\=(.*)/)) {
      //   navigate(decodeURIComponent(location?.search.match(/\?redirect\=(.*)/)[1]))
      // } else {
      if (
        userAuth?.emp?.role === "Owner" &&
        companyAuth?.company_verified === false
      ) {
        typeof window !== "undefined" && navigate("/upload-company-details");
        return null;
      } else {
        typeof window !== "undefined" && navigate(userAccessRouter()[0] || "");
      }
      // }
      return null;
    }
    return <>{children}</>;
  };

  return { ProtectedRoutes, HandleRedirect };
};

export default useAuth;
