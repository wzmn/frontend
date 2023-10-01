import React from "react";
const Default = (props: any) => {
  return (
    <>
      Default home page
      {JSON.stringify(props?.serverData)}
    </>
  );
};

export default Default;

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
