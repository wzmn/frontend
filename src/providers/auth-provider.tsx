import useLocalStorage from "hook/use-local-storage";
import { LoginResType } from "index";
import React, { Dispatch, createContext, useContext } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  userAuth: LoginResType;
  setUserAuth: Dispatch<LoginResType | null>;
};

const AuthContext = createContext({} as Context);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: Props) => {
  const [userAuth, setUserAuth] = useLocalStorage<LoginResType>("user");

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
