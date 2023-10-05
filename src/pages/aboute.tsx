import React from "react";
import { HeadFC } from "gatsby";
import Main from "../components/main";
import PrivateRouting from "../components/routeing/privateRouting";
import Layout from "../components/layout";

const Aboute = ({ serverData }: any): React.JSX.Element => {
  console.log(serverData);
  return (
    <div className="">
      Aboute page
      <pre>{JSON.stringify(serverData, null, 4)}</pre>
    </div>
  );
};

const ProtectAbout = ({ serverData }: any) => {
  console.log(serverData);
  return (
    <PrivateRouting Component={Aboute} role={true} serverData={serverData} />
  );
};

export default ProtectAbout;

export const Head: HeadFC = () => <title>Aboute Page</title>;

export async function getServerData() {
  console.log("inside getServerData");

  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);

    if (!res.ok) {
      throw new Error(`Response failed`);
    }
    console.log("inside getServerData req");

    return {
      props: await res.json(),
    };
  } catch (error) {
    console.log("inside getServerData err");

    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
