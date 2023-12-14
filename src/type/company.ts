import { PaginationType } from "./global";

export type CompanyDataType = PaginationType<Result[]>;

export interface Result {
  id?: number;
  company_owner?: CompanyOwner;
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

export interface CompanyOwner {
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

export type CompanyStatus =
  | "upload info"
  | "document review"
  | "verified"
  | "operational"
  | "rejected";

export type CompanyExtraDataType = Result & {
  status: boolean;
};

export type CompanyStateStatus = Record<CompanyStatus, CompanyExtraDataType[]>;
