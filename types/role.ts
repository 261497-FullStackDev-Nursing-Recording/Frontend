import { z } from "zod";

export const ROLE = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "NURSE_ADMIN",
  "NURSE",
  "USER",
]);
