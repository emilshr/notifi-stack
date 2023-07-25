import { z } from "zod";

export const paginatedInputSchema = z.object({
  cursor: z.string().nullish(),
});

export type PaginatedInput = z.infer<typeof paginatedInputSchema>;
