import { ROLE } from "./role";
import z from "zod";
const UserSchema = z.object({
  id: z.string(),
  f_name: z.string(),
  l_name: z.string(),
  username: z.string(),
  role: ROLE,
  created_at: z.string(),
});
export type User = z.infer<typeof UserSchema>;
