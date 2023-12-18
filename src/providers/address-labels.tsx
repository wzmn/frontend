import React, { useContext, createContext } from "react";
import { useAuthContext } from "./auth-provider";

type AddressLabelsContext = {
  district: () => string;
  city: () => string;
  postcode: () => string;
};

const AddressLabelsContext = createContext({} as AddressLabelsContext);
export const useAddressLabelContext = () => useContext(AddressLabelsContext);

const AddressLabels = ({ children }: { children: JSX.Element }) => {
  const { userAuth } = useAuthContext();
  function district() {
    switch (
      userAuth.emp_license_info?.company?.company_country?.toLocaleLowerCase()
    ) {
      case "united states":
        return "county";
      case "australian":
        return "LGA";
      default:
        return "LGA";
    }
  }

  function city() {
    switch (
      userAuth.emp_license_info?.company?.company_country?.toLocaleLowerCase()
    ) {
      case "united states":
        return "city";
      case "australian":
        return "Suburb";
      default:
        return "Suburb";
    }
  }

  function postcode() {
    switch (
      userAuth.emp_license_info?.company?.company_country?.toLocaleLowerCase()
    ) {
      case "united states":
        return "Zipcode";
      case "australian":
        return "Postcode";
      default:
        return "Postcode";
    }
  }

  return (
    <AddressLabelsContext.Provider value={{ district, postcode, city }}>
      {children}
    </AddressLabelsContext.Provider>
  );
};

export default AddressLabels;
