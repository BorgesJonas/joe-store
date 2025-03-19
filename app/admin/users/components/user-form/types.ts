import { updateUserSchema } from "@/lib/validators";
import { z } from "zod";

export interface UserFormProps {
  user: z.infer<typeof updateUserSchema>;
}
