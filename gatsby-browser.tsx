import React from "react";
import "styles/global.css";
import "styles/styles.scss";
import Layout from "./src/layout";
import CompanyProvider from "./src/providers/company-provider";
import AuthProvider from "./src/providers/auth-provider";
import AddressLabels from "./src/providers/address-labels";

import "react-phone-number-input/style.css";

import { PageProps } from "gatsby";
// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    <>
      <CompanyProvider>
        <AuthProvider>
          <AddressLabels>
            <Layout {...(restProps as PageProps)}>{element}</Layout>
          </AddressLabels>
        </AuthProvider>
      </CompanyProvider>
    </>
  );
};
