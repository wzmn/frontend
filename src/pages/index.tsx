import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Notifcations from "../components/notifications";

const IndexPage: React.FC<PageProps> = ({ path }) => {
  return <main className="flex items-center justify-center grow">
    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => {
      alert("You have been notified! :)")
    }}>
      Notify me
    </button>
    <Notifcations />
  </main>;
};

function CheckBoxes() { }

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
