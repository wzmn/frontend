import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Filterbtn from "components/filterBtn";
import Menu from "components/menu";

//test commit
const IndexPage: React.FC<PageProps> = ({ path }) => {
  return <main>index</main>;
};

function CheckBoxes() {}

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
