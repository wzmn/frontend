import React, { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  open: boolean;
  toggle: () => void;
  element: JSX.Element | null;
  setElement: (ele: JSX.Element, title?: string) => void;
  title: string;
};

const RightBarContext = createContext({} as Context);
export const useRightBarContext = () => useContext(RightBarContext);

const RightBarProvider = ({ children }: Props) => {
  const [value, setValue] = useState<
    Pick<Context, "open" | "element" | "title">
  >({
    open: false,
    element: null,
    title: "",
  });

  function toggle() {
    setValue((prev) => ({ ...prev, open: !prev.open }));
  }

  function setElement(ele: JSX.Element, title: string = "") {
    setValue((prev) => ({ ...prev, element: ele, title }));
  }

  return (
    <RightBarContext.Provider
      value={{
        open: value.open,
        element: value.element,
        title: value.title,
        toggle,
        setElement,
      }}
    >
      {children}
    </RightBarContext.Provider>
  );
};

export default RightBarProvider;
