import { DNDImageFileType } from "components/dnd-image";
import React, { useContext, createContext, useState } from "react";

type Files = Record<"file", DNDImageFileType[]>;

type UploadDocContextType = {
  files: Files[];
  setFiles: (e: any) => void;
};

const UploadDocContext = createContext({} as UploadDocContextType);
export const useUploadContext = () => useContext(UploadDocContext);

const UploadDocProvider = ({ children }: { children: JSX.Element }) => {
  const [files, setFiles] = useState<Files[]>([]);

  return (
    <UploadDocContext.Provider value={{ files, setFiles }}>
      {children}
    </UploadDocContext.Provider>
  );
};

export default UploadDocProvider;
