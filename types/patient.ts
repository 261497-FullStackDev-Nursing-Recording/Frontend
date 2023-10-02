import { z } from "zod";
import { STATUS } from "./status";

export const PatientSchema = z.object({
  id: z.string(),
  f_name: z.string(),
  l_name: z.string(),
  identification_id: z.string(),
  age: z.number(),
  phone_number: z.string(),
  birthday: z.string().datetime(),
  hn: z.string(),
  an: z.string(),
  current_bed_number: z.string(),
  isQuit: z.boolean(),
  status: z.string(),
  created_at: z.string().datetime(),
});

export const GetAllPatientSchema = z.object({
  f_name: z.string().optional(),
  l_name: z.string().optional(),
  identification_id: z.string(),
  age: z.number(),
  phone_number: z.string(),
  birthday: z.string().datetime(),
  an: z.string(),
  hn: z.string(),
  current_bed_number: z.number(),
  isQuit: z.boolean(),
  status: STATUS.optional(),
  fromDate: z.string().optional(),
});

export const SearchPatientSchema = z.object({
  an: z.string().optional(),
  bed_number: z.number().optional(),
  name: z.string().optional(),
});

export const GetPatientsByIdsSchema = z.object({
  ids: z.array(z.string()),
});
export const LinkPatientSchema = z.object({
  user_id: z.string(),
  patient_id: z.string(),
});

export const RemoveLinkedPatientsSchema = z.object({
  patient_id: z.array(z.string()),
});

export type Patient = z.infer<typeof PatientSchema>;
export type GetAllPatient = z.infer<typeof GetAllPatientSchema>;
export type SearchPatient = z.infer<typeof SearchPatientSchema>;
export type GetPatientsByIds = z.infer<typeof GetPatientsByIdsSchema>;
export type LinkPatient = z.infer<typeof LinkPatientSchema>;
export type RemoveLinkedPatients = z.infer<typeof RemoveLinkedPatientsSchema>;
