import React, { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  sidebarFlag: boolean;
  toggle: () => void;
};

const SidebarProvider = createContext({} as Context);

export const useSidebarContext = () => useContext(SidebarProvider);

const SidebarContext = ({ children }: Props) => {
  const [sidebarFlag, setSidebarFlag] = useState(false);

  function toggle() {
    setSidebarFlag((prev) => !prev);
  }
  return (
    <SidebarProvider.Provider value={{ sidebarFlag, toggle }}>
      {children}
    </SidebarProvider.Provider>
  );
};

export default SidebarContext;
