export interface EmployeeDataType {
  id?: number;
  user?: User;
  ref_id?: null;
  license_id?: number;
  role?: number;
  reports_to?: null;
  created_by?: null;
}

export interface User {
  id?: number;
  ref_id?: null;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  username?: null;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_verified?: boolean;
  is_password_set?: boolean;
  last_login?: Date;
  groups?: any[];
  user_permissions?: any[];
}

export type EmployeeRole =
  | "admin"
  | "agent"
  | "auditor"
  | "manager"
  | "field_worker";
