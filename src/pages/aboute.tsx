import React from "react";
import { HeadFC } from "gatsby";
import Layout from "../components/layout";

const Aboute = () => {
  return (
    <Layout>
      <div className="">Aboute page</div>
    </Layout>
  );
};

export default Aboute;

export const Head: HeadFC = () => <title>Aboute Page</title>;
