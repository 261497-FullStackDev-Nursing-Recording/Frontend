export interface FieldType {
  id: string;
  record_id: string;
  user_id: string;
  created_by: string;
  field_code: string;
  field_pre_label?: string;
  field_value: string;
  field_post_label?: string;
  parents: string;
  children: string;
  created_at: string;
  modified_at: string;
}
export interface CreateFieldType {
  user_id: string;
  field_code: string;
  field_pre_label?: string;
  field_value: string;
  field_post_label?: string;
}
