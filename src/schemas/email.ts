import { z } from "zod";

export const emailSchema = z.object({
    from: z.string().email(),
    to: z.string().email(),
    subject: z.string().min(1),
    text: z.string().min(1),
    html: z.string().optional(),
    attachments: z.array(z.object({
        filename: z.string(),
        content: z.string()
    })).optional()
}); 