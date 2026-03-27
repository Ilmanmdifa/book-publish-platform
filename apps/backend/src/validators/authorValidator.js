import { z } from "zod";

const addToAuthorSchema = z.object({
  name: z.string().min(1).max(255),
});

export { addToAuthorSchema };
