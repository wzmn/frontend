import { navigate } from "gatsby";
import React, { FC } from "react";
type Props = {
  Component: React.ElementType;
  role: boolean;
  props?: any;
  serverData: any;
};

const PrivateRouting: FC<Props> = (
  { Component, role, serverData },
  ...props
): JSX.Element | null => {
  if (role) {
    return <Component {...props} serverData={serverData} />;
  } else {
    navigate("/login");
    return null;
  }
};

export default PrivateRouting;
