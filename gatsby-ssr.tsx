import React from "react";
import Layout from "./src/layout";
import "./src/styles/global.css";

// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    <>
      <Layout {...restProps}>{element}</Layout>
    </>
  );
};
