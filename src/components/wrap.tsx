import React from "react";
import Main from "./main";

export const wrapRootElement = ({ element }: { element: JSX.Element }) => {
  return <Main>{element}</Main>;
};
