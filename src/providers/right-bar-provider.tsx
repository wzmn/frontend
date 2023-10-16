import React, { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  open: boolean;
  toggle: () => void;
  element: JSX.Element | null;
  setElement: (ele: JSX.Element) => void;
};

const RightBarContext = createContext({} as Context);
export const useRightBarContext = () => useContext(RightBarContext);

const RightBarProvider = ({ children }: Props) => {
  const [value, setValue] = useState<Pick<Context, "open" | "element">>({
    open: true,
    element: null,
  });

  function toggle() {
    setValue((prev) => ({ ...prev, open: !prev.open }));
  }

  function setElement(ele: JSX.Element) {
    setValue((prev) => ({ ...prev, element: ele }));
  }

  return (
    <RightBarContext.Provider
      value={{ open: value.open, element: value.element, toggle, setElement }}
    >
      {children}
    </RightBarContext.Provider>
  );
};

export default RightBarProvider;
