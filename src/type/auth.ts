export type LoginResType = {
  refresh: string;
  access: string;
  user_id: number;
  email: string;
  phone: string;
  last_login: Date;
  staff: string;
  first_name: string;
  last_name: string;
  fcm_token: null;
  is_password_set: boolean;
  emp: Emp;
  emp_license_info: EmpLicenseInfo;
};

export interface Emp {
  id: number;
  role: string;
  is_active: boolean;
  reports_to: null;
}

export interface EmpLicenseInfo {
  id: number;
  company: Company;
  is_active: boolean;
}

export interface Company {
  id: number;
  is_active: boolean;
  company_name: string;
  company_country: string;
}
export type UseLocalStorageP1Type = "user" | "company";
