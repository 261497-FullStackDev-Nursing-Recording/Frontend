import { SHIFT } from "./shift";

export interface RecordType {
  id: string;
  user_id: string;
  patient_id: string;
  bed_number: string;
  ward: string;
  diseaseGroup: string;
  shift: string;
  visit_number: string;
  created_at: string;
  modified_at: string;
}
export interface SearchRecordType {
  user_id?: string;
  patient_id?: string;
  bed_number?: 0;
  ward?: string;
  diseaseGroup?: string;
  shift?: SHIFT;
  visit_number?: string;
  fromDate?: string;
  toDate?: string;
  includeFields?: boolean;
}

export interface UpdateRecordType {
  bed_number: number;
  ward: string;
  diseaseGroup: string;
  shift: SHIFT;
  visit_number: string;
}