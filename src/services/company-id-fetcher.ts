import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";
import { useEffect } from "react";
const companyFilterAccessRoles = ["superadmin", "scheduler"];
function companyIdFetcher(str: string) {
  const role = (str || "").toLowerCase();
  const { company } = useCompanyContext();
  const { userAuth } = useAuthContext();
  useEffect(() => {}, [JSON.stringify(company)]);
  if (JSON.stringify(company) === "{}" || JSON.stringify(company) === null) {
    return null;
  }
  if (companyFilterAccessRoles.includes(role)) return company?.id;
  return userAuth?.emp_license_info.company?.id;
}

export default companyIdFetcher;
