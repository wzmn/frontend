import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";

function companyIdFetcher(str: string) {
  const role = (str || "").toLowerCase();
  const { company } = useCompanyContext();
  const { userAuth } = useAuthContext();
  if (JSON.stringify(company) === "{}") {
    return null;
  }
  if (role === "superadmin") return company?.id;
  return userAuth?.emp_license_info.company?.id;
}

export default companyIdFetcher;
