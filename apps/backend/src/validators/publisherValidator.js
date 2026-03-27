import { z } from "zod";

const addToPublisherSchema = z.object({
  name: z.string().min(1).max(255),
});

export { addToPublisherSchema };
