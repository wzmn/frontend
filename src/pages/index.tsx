import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = ({ path }) => {
  return <main>Home page {path} </main>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
