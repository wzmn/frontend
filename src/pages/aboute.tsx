import React from "react";
import { HeadFC } from "gatsby";
import Main from "../components/main";
import PrivateRouting from "../components/routeing/privateRouting";

const Aboute = ({ serverData }: any): React.JSX.Element => {
  console.log(serverData);
  return (
    <Main>
      <div className="">
        Aboute page
        <pre>{JSON.stringify(serverData, null, 4)}</pre>
      </div>
    </Main>
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
