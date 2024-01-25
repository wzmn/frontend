import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ComResultT } from "type/company";

export type CompanyProviderT = {
  company: ComResultT;
  setCompany: Dispatch<SetStateAction<ComResultT>>;
};

const CompanyContext = createContext({} as CompanyProviderT);

export const useCompanyContext = () => useContext(CompanyContext);

const CompanyProvider = ({ children }: { children: JSX.Element }) => {
  const [company, setCompany] = useState<ComResultT>({} as ComResultT);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
