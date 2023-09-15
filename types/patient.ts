import { STATUS } from "./status";

export interface Patient {
  id: string;
  f_name: string;
  l_name: string;
  hn: string;
  identification_id: string;
  status: string;
  created_at: string;
}

export interface SearchPatient {
  indentification_id: string;
  f_name: string;
  l_name: string;
  status: STATUS;
  fromDate: string;
}

export interface LinkPatient {
  user_id: string;
  patient_id: string;
}

export interface removeLinkedPatients {
  patient_id: string[];
}
