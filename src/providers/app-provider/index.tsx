import React, { createContext, useContext, useEffect, useState } from "react";
import { ApptStateStatus } from "type/appointment";
import { AppProviderType } from "./type";
import { fetchApptStatus } from "./appt";

const AppContext = createContext({} as AppProviderType);

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: JSX.Element }) {
  const [appState, setAppState] = useState<AppProviderType>({
    appointment: {
      statusData: {},
      status: {} as ApptStateStatus,
    },
  });

  async function init() {
    const { status, statusData } = await fetchApptStatus();
    setAppState((prev) => ({
      ...prev,
      appointment: {
        status,
        statusData,
      },
    }));
  }

  useEffect(() => {
    init();
  }, []);

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export default AppProvider;
