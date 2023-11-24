import { DNDImageFileType } from "components/dnd-image";
import React, { useContext, createContext, useState } from "react";
import { string } from "yup";

type ObjectType = {
  detail: number | null;
  documents: DNDImageFileType[];
};

export type KeyType = "primary" | "secondary" | "additional";

type Files = {
  [keyof in KeyType]: { [keyof in number]: ObjectType };
};

type UploadDocContextType = {
  files: Files;
  setFiles: (e: any) => void;
};

const UploadDocContext = createContext({} as UploadDocContextType);
export const useUploadContext = () => useContext(UploadDocContext);

const UploadDocProvider = ({ children }: { children: JSX.Element }) => {
  const [files, setFiles] = useState<Files>({
    primary: {},
    secondary: {},
    additional: {},
  });

  return (
    <UploadDocContext.Provider value={{ files, setFiles }}>
      {children}
    </UploadDocContext.Provider>
  );
};

export default UploadDocProvider;

/*
  {
    primary: {
      detail: null,
      documents: [],
    },
    additional: {
      detail: null,
      documents: [],
    },
    secondary: {
      detail: null,
      documents: [],
    },
  }
 */
