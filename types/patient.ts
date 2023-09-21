import { z } from "zod";
import { STATUS } from "./status";

export const PatientSchema = z.object({
  id: z.string(),
  f_name: z.string(),
  l_name: z.string(),
  hn: z.string(),
  identification_id: z.string(),
  status: z.string(),
  created_at: z.string(),
});

export const SearchPatientSchema = z.object({
  identification_id: z.string().optional(),
  f_name: z.string().optional(),
  l_name: z.string().optional(),
  status: STATUS.optional(),
  fromDate: z.string().optional(),
});

export const LinkPatientSchema = z.object({
  user_id: z.string(),
  patient_id: z.string(),
});

export const RemoveLinkedPatientsSchema = z.object({
  patient_id: z.array(z.string()),
});

export type Patient = z.infer<typeof PatientSchema>;
export type SearchPatient = z.infer<typeof SearchPatientSchema>;
export type LinkPatient = z.infer<typeof LinkPatientSchema>;
export type RemoveLinkedPatients = z.infer<typeof RemoveLinkedPatientsSchema>;
