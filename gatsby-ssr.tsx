import React from "react";
import Layout from "./src/layout";

import "styles/global.css";
import "styles/styles.scss";
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

const HeadComponents = [
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBO-6AKRGl3NxAyPB3g4ns9mb_qHdirGq0&libraries=places" />,
];

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
