import { useState } from "react";

type UserData = {
  refresh?: string;
  access?: string;
  user_id?: number;
  email?: string;
  phone?: string;
  last_login?: Date;
};

const userCredential = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return { userData, setUserData };
};

export default userCredential;
