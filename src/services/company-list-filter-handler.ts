import { useCompanyContext } from "providers/company-provider";
import companyIdFetcher from "./company-id-fetcher";
import UserIdentifyer from "./user-identifyer";
import { useAuthContext } from "providers/auth-provider";

const roles = ["superadmin", "scheduler"];

export default function companyListFilterHandler() {
  const { companyListFilter } = useCompanyContext();
  const userRole = UserIdentifyer();
  const { userAuth } = useAuthContext();
  const id = userAuth?.emp_license_info?.company?.id;

  if (roles.includes(userRole)) {
    const ids = companyListFilter.map((val) => val.id);
    return ids;
  } else {
    return [id];
  }
}
