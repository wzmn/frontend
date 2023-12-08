export interface CountryComplianceType {
  id?: number;
  ref_id?: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  compliance_country?: string;
  compliance_item?: string;
  compliance_help_text?: string;
  item_type?: ItemType;
  allow_multiple_docs?: boolean;
  points?: number;
  is_required?: boolean;
  document_priority?: string;
}

export type ItemType = "primary" | "secondary" | "additional";

export interface PaginationType<T> {
  count?: number;
  next?: null;
  previous?: null;
  results?: T;
}

export type RoleType =
  | "Snippit Admin"
  | "Snippit Manger"
  | "Snippit Auditor"
  | "Admin"
  | "Manager"
  | "Team Leader"
  | "Auditor"
  | "Agent"
  | "Field Worker"
  | "Customer";
