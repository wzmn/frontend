import React from "react";
import { navigate } from "gatsby";
import { useAuthContext } from "providers/auth-provider";

type Props = {
  children: JSX.Element;
};

const useAuth = () => {
  const ProtectedRoutes = ({ children }: Props) => {
    const { userAuth } = useAuthContext();

    if (!userAuth) navigate("/login", { replace: true });
    return <>{children}</>;
  };

  const HandleRedirect = ({ children }: Props) => {
    const { userAuth } = useAuthContext();

    if (!!userAuth) navigate("/", { replace: true });
    console.log("login", userAuth);
    return <>{children}</>;
  };

  return { ProtectedRoutes, HandleRedirect };
};

export default useAuth;
