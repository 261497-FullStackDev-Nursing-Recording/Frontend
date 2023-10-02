import { z } from "zod";

export const FieldSchema = z.object({
  id: z.string(),
  record_id: z.string(),
  user_id: z.string(),
  created_by: z.string(),
  field_code: z.string(),
  field_pre_label: z.string().optional(),
  field_value: z.string(),
  field_post_label: z.string().optional(),
  parents: z.string(),
  children: z.string(),
  created_at: z.string().datetime(),
  modified_at: z.string().datetime(),
});

export const CreateFieldsSchema = z.object({
  record_id: z.string(),
  user_id: z.string(),
  field_code: z.string(),
  field_pre_label: z.string().optional(),
  field_value: z.string(),
  field_post_label: z.string().optional(),
});
export type CreateFields = z.infer<typeof CreateFieldsSchema>;
