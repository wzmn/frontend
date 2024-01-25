import React from "react";
import "styles/global.css";
import "styles/styles.scss";
import Layout from "./src/layout";
import CompanyProvider from "./src/providers/company-provider";
import "react-phone-number-input/style.css";

import { PageProps } from "gatsby";
// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    <>
      <CompanyProvider>
        <Layout {...(restProps as PageProps)}>{element}</Layout>
      </CompanyProvider>
    </>
  );
};
