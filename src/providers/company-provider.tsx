import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Result } from "type/company";

export type CompanyProviderT = {
  company: Result;
  setCompany: Dispatch<SetStateAction<Result>>;
};

const CompanyContext = createContext({} as CompanyProviderT);

export const useCompanyContext = () => useContext(CompanyContext);

const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const [company, setCompany] = useState<Result>({});

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
