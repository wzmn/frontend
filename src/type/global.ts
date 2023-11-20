export interface CountryComplianceType {
  id?: number;
  ref_id?: string;
  created_at?: Date;
  updated_at?: Date;
  is_active?: boolean;
  compliance_country?: string;
  compliance_item?: string;
  compliance_help_text?: string;
  item_type?: string;
  allow_multiple_docs?: boolean;
  points?: number;
  is_required?: boolean;
}
