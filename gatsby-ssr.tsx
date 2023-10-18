import React from "react";
import Layout from "./src/layout";

import "styles/global.scss";
import { PageProps } from "gatsby";

// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    <>
      <Layout {...(restProps as PageProps)}>{element}</Layout>
    </>
  );
};
