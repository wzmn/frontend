import React from "react";
import "./src/styles/global.css";
import Layout from "./src/layout";
import RightBarProvider from "./src/providers/right-bar-provider";
// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    <>
      <RightBarProvider>
        <Layout {...restProps}>{element}</Layout>
      </RightBarProvider>
    </>
  );
};
