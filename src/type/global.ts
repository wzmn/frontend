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

export type PrimaryAddressFieldsT = {
  building_number?: string;
  level_number?: string;
  unit_type?: string;
  unit_number?: string;
  lot_number?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  suffix?: string;
  suburb?: string;
  state?: string;
  pincode?: string;
  lga?: string;
};

export type WorkTypeRespT = PaginationType<WorkTypeT[]>;

export interface WorkTypeT {
  id: number;
  ref_id: null | string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  title: string;
  work_type_image: string;
  global_activity: boolean;
  auth_companies: number[];
}

export type WorkTypeRespQuestionT = PaginationType<WorkTypeQuestionT[]>;

export interface WorkTypeQuestionT {
  id: number;
  options: Option[];
  ref_id: null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  content: string;
  question_type: Question_type | "";
  company: number;
  work_type: number;
}

export type Question_type =
  | "image"
  | "text"
  | "video"
  | "signature"
  | "file"
  | "multi_choice_ss"
  | "multi_choice_ms";

export interface Option {
  id: number;
  next_question: WorkTypeQuestionT;
  option_text: string;
  question: number;
}
