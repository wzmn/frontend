import React, { createContext, useContext, useEffect, useState } from "react";
import { ApptStateStatus } from "type/appointment";
import { AppProviderType } from "./type";
import { fetchApptStatus } from "./appt";
import { fetchWorkTypes } from "./work-types";
import { fetchEmpStatus } from "./emp";
import { EmpStateStatus } from "type/employee";
import { FetchCompanyStatusT, fetchCompanyStatus } from "./company";
import { CompanyStateStatus } from "type/company";

const AppContext = createContext({} as AppProviderType);

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, setAppState] = useState<AppProviderType>({
    appointment: {
      statusData: [],
      status: {} as ApptStateStatus,
    },
    workTypes: [],
    emp: {
      status: {} as EmpStateStatus,
      statusData: [],
    },
    company: {
      status: {} as CompanyStateStatus,
    },
  });

  async function init() {
    // const { status, statusData } = await fetchApptStatus();
    // const workType = await fetchWorkTypes();

    Promise.all([
      fetchApptStatus,
      fetchWorkTypes,
      fetchEmpStatus,
      fetchCompanyStatus,
    ])
      .then(async (values) => {
        const appt = await values[0]();
        const workTypes = await values[1]();
        const emp = await values[2]();
        const company = await values[3]();

        setAppState((prev) => ({
          ...prev,
          appointment: appt,
          workTypes,
          emp,
          company,
        }));
      })
      .catch(() => {
        console.log("error in app provider ");
      });
  }

  useEffect(() => {
    init();
  }, []);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export default AppProvider;
