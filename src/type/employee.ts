import { PaginationType } from "./global";

export type EmployeeDataType = PaginationType<EmpResultT[]>;

export interface EmpResultT {
  id: number;
  user: User;
  role: string;
  employee_created_by: null | string;
  company: number;
  documents: EmpResultDocumentT[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_verified: boolean;
  license_id: number;
  created_by: null;
  reports_to: null;
}

export interface EmpResultDocumentT {
  id: number;
  detail: EmpDetailT;
  documents: EmpDocumentDocumentT[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  info: null;
  is_verified: boolean;
  comments: null;
  employee: number;
}

export interface EmpDetailT {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  compliance_country: string;
  compliance_item: string;
  compliance_help_text: string;
  item_type: string;
  allow_multiple_docs: boolean;
  points: number;
  is_required: boolean;
  priority: string;
}

export interface EmpDocumentDocumentT {
  id: number;
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  file: string;
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
  | "Owner"
  | "Admin"
  | "Super Admin"
  | "Agent"
  | "Auditor"
  | "Manager"
  | "Field Worker";

export type EmployeeDataStateType = EmpResultT & {
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
