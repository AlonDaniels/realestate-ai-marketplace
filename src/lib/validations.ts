import { z } from "zod";

export const createToolSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  longDescription: z.string().max(5000).optional(),
  price: z.number().int().min(0).max(99900), // cents, max $999/mo
  category: z.enum(["ai-agent", "automation", "analytics", "marketing", "lead-gen", "property-mgmt"]),
  tags: z.array(z.string().max(30)).max(10),
});

export const updateToolSchema = createToolSchema.partial();

export const createReviewSchema = z.object({
  toolId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().max(2000).optional(),
});

export type CreateToolInput = z.infer<typeof createToolSchema>;
export type UpdateToolInput = z.infer<typeof updateToolSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
