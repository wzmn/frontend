import React, { createContext, useContext, useState } from "react";

type Props = {
  children: JSX.Element;
};

type Context = {
  open: boolean;
  toggle: () => void;
  element: JSX.Element | null;
  setElement: (ele: JSX.Element, title?: string, actions?: JSX.Element) => void;
  title: string;
  actions: JSX.Element;
};

const RightBarContext = createContext({} as Context);
export const useRightBarContext = () => useContext(RightBarContext);

const RightBarProvider = ({ children }: Props) => {
  const [value, setValue] = useState<
    Pick<Context, "open" | "element" | "title" | "actions">
  >({
    open: false,
    element: null,
    title: "",
    actions: <></>,
  });

  function toggle() {
    setValue((prev) => ({ ...prev, open: !prev.open }));
  }

  function setElement(
    ele: JSX.Element,
    title: string = "",
    actions: JSX.Element = <></>
  ) {
    setValue((prev) => ({ ...prev, element: ele, title, actions }));
  }

  return (
    <RightBarContext.Provider
      value={{
        open: value.open,
        element: value.element,
        title: value.title,
        toggle,
        setElement,
        actions: value.actions,
      }}
    >
      {children}
    </RightBarContext.Provider>
  );
};

export default RightBarProvider;
