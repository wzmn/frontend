import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Notifcations from "../components/notifications";

const IndexPage: React.FC<PageProps> = ({ path }) => {
  return <main className="flex items-center justify-center grow">
    Dashboard 
    <Notifcations />
  </main>;
};

function CheckBoxes() { }

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
