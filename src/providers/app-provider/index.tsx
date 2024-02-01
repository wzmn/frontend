import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchApptStatus } from "./appt";
import { fetchCategory } from "./category";
import { fetchCompanyStatus } from "./company";
import { fetchEmpStatus } from "./emp";
import { fetchQuestionsList } from "./questions";
import { AppProviderType } from "./type";
import { fetchWorkTypes } from "./work-types";

const AppContext = createContext({} as AppProviderType);

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, setAppState] = useState<AppProviderType>({
    appointment: {
      statusData: [],
      status: {},
    },
    workTypes: [],
    category: [],
    emp: {
      status: {},
      statusData: [],
    },
    company: {
      status: {},
    },
    questions: {},
  });

  async function init() {
    // const { status, statusData } = await fetchApptStatus();
    // const workType = await fetchWorkTypes();

    Promise.all([
      fetchApptStatus,
      fetchWorkTypes,
      fetchEmpStatus,
      fetchCompanyStatus,
      fetchQuestionsList,
      fetchCategory,
    ])
      .then(async (values) => {
        const appt = (await values[0]()) || {};
        const workTypes = (await values[1]()) || {};
        const emp = (await values[2]()) || {};
        const company = (await values[3]()) || {};
        const questions = (await values[4]()) || {};
        const category = (await values[5]()) || {};

        setAppState((prev) => ({
          ...prev,
          appointment: appt,
          workTypes,
          emp,
          company,
          questions,
          category,
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
