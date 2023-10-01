import React from "react";
import { HeadFC } from "gatsby";
import Layout from "../components/layout";
import Main from "../components/main";

const Aboute = ({ serverData }: any) => {
  return (
    <Main>
      <div className="">
        Aboute page
        <pre>{JSON.stringify(serverData, null, 4)}</pre>
      </div>
    </Main>
  );
};

export default Aboute;

export const Head: HeadFC = () => <title>Aboute Page</title>;

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.ok) {
      throw new Error(`Response failed`);
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
