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
      typeof window !== "undefined" && navigate("/login", { replace: true });
      return null;
    }
    return <>{children}</>;
  };

  const HandleRedirect = ({ children }: Props) => {
    const { userAuth } = useAuthContext();

    if (!!userAuth) {
      typeof window !== "undefined" && navigate("/", { replace: true });
      console.log("login", userAuth);
      return null;
    }
    return <>{children}</>;
  };

  return { ProtectedRoutes, HandleRedirect };
};

export default useAuth;
