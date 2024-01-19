import React from "react";
import { navigate } from "gatsby";
import { useAuthContext } from "providers/auth-provider";

type Props = {
  children: JSX.Element;
};

const useAuth = () => {
  const ProtectedRoutes = ({ children }: Props) => {
    const { userAuth } = useAuthContext();
    if (!userAuth) {
      if (!location.pathname.match(/login/)) {
        typeof window !== "undefined" && navigate(`/login/`, { replace: true });
        // typeof window !== "undefined" && navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`, { replace: true });
      }
      return null;
    }
    return <>{children}</>;
  };

  const HandleRedirect = ({ children }: Props) => {
    const { userAuth } = useAuthContext();

    if (!!userAuth) {
      // If user is logged in then redirect to dashboard or navigate to a redirect from login
      if (location.search.match(/\?redirect\=(.*)/)) {
        navigate(decodeURIComponent(location?.search.match(/\?redirect\=(.*)/)[1]))
      } else {
        typeof window !== "undefined" && navigate("/");
      }
      return null;
    }
    return <>{children}</>;
  };

  return { ProtectedRoutes, HandleRedirect };
};

export default useAuth;
