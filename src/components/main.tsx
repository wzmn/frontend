import React from "react";
import Layout from "./layout";
const Main = ({ children }: { children: JSX.Element }) => {
  return (
    <Layout>
      <>{children}</>
    </Layout>
  );
};

export default Main;
