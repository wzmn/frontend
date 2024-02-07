import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ComResultT } from "type/company";

export type CompanyProviderDataT = ComResultT & {
  label?: string;
};

export type CompanyProviderT = {
  company: CompanyProviderDataT;
  setCompany: Dispatch<SetStateAction<CompanyProviderDataT>>;
};

const CompanyContext = createContext({} as CompanyProviderT);

export const useCompanyContext = () => useContext(CompanyContext);

const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const [company, setCompany] = useState<CompanyProviderDataT>(
    {} as CompanyProviderDataT
  );

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
