import React, { useContext, createContext, useState } from "react";

type ConfirmDialogContextT = {
  open: boolean;
};

const ConfirmDialogContext = createContext({} as ConfirmDialogContextT);
export const useConfirmDialog = () => useContext(ConfirmDialogContext);

const ConfirmDialogProvider = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(false);

  function confirm() {
    return new Promise((complete, failed) => {});
  }

  return (
    <ConfirmDialogContext.Provider value={{ open }}>
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogProvider;
