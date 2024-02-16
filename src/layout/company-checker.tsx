import { navigate } from "gatsby";
import { useAuthContext } from "providers/auth-provider";
import React, { useEffect } from "react";

const CompanyChecker = ({ children }: { children: JSX.Element }) => {
  const { companyAuth } = useAuthContext();
  useEffect(() => {
    console.log(companyAuth);
    if (!companyAuth?.company_verified) {
      navigate("/upload-company-details");
    }
  }, [companyAuth]);
  return <div>{children}</div>;
};

export default CompanyChecker;
