import { useAuthContext } from "providers/auth-provider";
import { useCompanyContext } from "providers/company-provider";
import UserIdentifyer from "./user-identifyer";

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
