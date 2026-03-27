import { z } from "zod";

const addToBookSchema = z.object({
  title: z.string().min(1).max(255),
  authorId: z.string().uuid(),
  publisherId: z.string().uuid(),
  releaseYear: z.number().int(),
});

export { addToBookSchema };
