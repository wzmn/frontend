import { useAuthContext } from "providers/auth-provider";

//these are all not to give access array;
export const admin = ["company"];
export const manager = ["company"];
export const teamLead = ["company"];
export const auditor = ["company"];
export const Agent = ["company"];

export function notToShow() {
  const { userAuth } = useAuthContext();
  // switch()
}
