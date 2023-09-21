import { z } from "zod";
import { SHIFT } from "./shift";
import { CreateFieldSchema } from "./field";

export const RecordSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  patient_id: z.string(),
  bed_number: z.string(),
  ward: z.string(),
  diseaseGroup: z.string(),
  shift: z.string(),
  visit_number: z.string(),
  created_at: z.string(),
  modified_at: z.string(),
});

export const CreateRecordSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  patient_id: z.string(),
  bed_number: z.string(),
  ward: z.string(),
  diseaseGroup: z.string(),
  shift: z.string(),
  visit_number: z.string(),
  field: z.array(CreateFieldSchema),
  created_at: z.string(),
  modified_at: z.string(),
});

export const SearchRecordSchema = z.object({
  user_id: z.string().optional(),
  patient_id: z.string().optional(),
  bed_number: z.string().optional(),
  ward: z.string().optional(),
  diseaseGroup: z.string().optional(),
  shift: SHIFT.optional(),
  visit_number: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  includeFields: z.boolean().optional(),
});

export const UpdateRecordSchema = z.object({
  bed_number: z.number(),
  ward: z.string(),
  diseaseGroup: z.string(),
  shift: SHIFT,
  visit_number: z.string(),
});

export type Record = z.infer<typeof RecordSchema>;
export type CreateRecord = z.infer<typeof CreateRecordSchema>;
export type SearchRecord = z.infer<typeof SearchRecordSchema>;
export type UpdateRecord = z.infer<typeof UpdateRecordSchema>;
