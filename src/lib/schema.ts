import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  service: z.string().trim().min(1, "Please choose a service.").max(100),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters.").optional(),
  honeypot: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
