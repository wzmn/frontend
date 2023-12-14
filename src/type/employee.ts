import { PaginationType } from "./global";

export type EmployeeDataType = PaginationType<Result[]>;

export interface Result {
  id?: number;
  user?: User;
  role?: string;
  ref_id?: null;
  license_id?: number;
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
  | "Admin"
  | "Super Admin"
  | "Agent"
  | "Auditor"
  | "Manager"
  | "Field Worker";

export type EmployeeDataStateType = Result & {
  status: boolean;
};

export type EmpStatusRespT = PaginationType<EmpStatusT[]>;

export interface EmpStatusT {
  id: number;
  ref_id: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: EmployeeRole;
}

export type EmpStateStatus = Record<EmployeeRole, EmployeeDataStateType[]>;
