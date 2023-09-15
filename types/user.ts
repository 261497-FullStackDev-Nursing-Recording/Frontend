import { ROLE } from "./role";

export interface User {
  id: string;
  f_name: string;
  l_name: string;
  username: string;
  role: ROLE;
  created_at: string;
}
