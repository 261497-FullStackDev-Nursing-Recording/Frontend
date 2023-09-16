import { STATUS } from "./status";

export interface PatientType {
  id: string;
  f_name: string;
  l_name: string;
  hn: string;
  identification_id: string;
  status: string;
  created_at: string;
}

export interface SearchPatientType {
  identification_id?: string;
  f_name?: string;
  l_name?: string;
  status?: STATUS;
  fromDate?: string;
}

export interface LinkPatientType {
  user_id: string;
  patient_id: string;
}

export interface RemoveLinkedPatientsType {
  patient_id: string[];
}
