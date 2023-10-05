import React from "react";
import Layout from "./src/components/Layout";

// export const wrapRootElement = ({ element, ...restProps }, ...args) => {
//   return <Layout {...restProps}>{element}</Layout>;
// };
export const wrapPageElement = ({ element, ...restProps }, ...args) => {
  return (
    // <Layout name="wrapPageElement" props={{}} args={args} mode="browser">
    <>
      <pre>{JSON.stringify(args, null, 4)}</pre>
      <Layout {...restProps}>{element}</Layout>
    </>
  );
};
