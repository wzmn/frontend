import { PaginationType } from "./global";

export type CustomerDataType = PaginationType<Result[]>;

export interface Result {
  id?: number;
  user?: User;
  company?: Company;
  assigned_to?: AssignedTo | null;
  role?: string;
  ref_id?: null;
  is_active?: boolean;
}

export interface AssignedTo {
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

export interface Company {
  id?: number;
  company_owner?: User;
  company_address?: null;
  info?: any[];
  ref_id?: null;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  company_name?: string;
  company_email?: string;
  company_mobile_phone?: string;
  company_landline?: string;
  company_country?: string;
  company_status?: string;
  company_type?: string;
  primary?: boolean;
}

export type CustomerDataExtraType = Result & {
  status: boolean;
  index: number;
};

export type CustomerStatus = "NEW" | "CONTACTED" | "COMPLETED" | "WON" | "LOST";
