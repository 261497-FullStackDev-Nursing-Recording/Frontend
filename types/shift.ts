import { z } from "zod";

export const SHIFT = z.enum(["MORNING", "EVENING", "NIGHT"]);
