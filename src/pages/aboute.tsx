import React from "react";
import { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Main from "../components/main";

const Aboute = () => {
  return (
    <Main>
      <div className="">Aboute page</div>
    </Main>
  );
};

export default Aboute;

export const Head: HeadFC = () => <title>Aboute Page</title>;
