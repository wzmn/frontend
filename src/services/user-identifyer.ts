import { useAuthContext } from "providers/auth-provider";

function UserIdentifyer(): string {
  const { userAuth } = useAuthContext();

  if (userAuth?.staff === "true") return "superadmin";
  return userAuth?.emp?.role.toLocaleLowerCase();
}

export default UserIdentifyer;
