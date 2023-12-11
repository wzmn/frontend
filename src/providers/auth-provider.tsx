import useLocalStorage from "hook/use-local-storage";
import { LoginResType } from "type/auth";
import React, { Dispatch, createContext, useContext } from "react";
import { ImSpinner10 } from "react-icons/im";
type Props = {
  children: JSX.Element;
};

type Context = {
  userAuth: LoginResType;
  setUserAuth: Dispatch<LoginResType | null>;
};

const AuthContext = createContext({} as Context);

export const useAuthContext = () => useContext(AuthContext);

function Loading() {
  return (
    <>
      <div
        className="flex"
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ImSpinner10
          className="animate-spin mb-2"
          style={{ marginBottom: "10px", fontSize: "1.5rem" }}
        />
        Authenticating
      </div>
    </>
  );
}

const AuthProvider = ({ children }: Props) => {
  const [userAuth, setUserAuth] = useLocalStorage<LoginResType>("user");

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {typeof window !== "undefined" ? children : <Loading />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
