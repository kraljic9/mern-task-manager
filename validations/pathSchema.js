import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Error task title must have 3 character minimum")
    .max(100, "Error task title must have less than a 100 characters"),

  completed: z.boolean().optional().default(false),
});

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Error username must have 3 character minimum")
    .max(20, "Error username must have less than a 20 characters"),

  email: z.string().email(),

  password: z.string().min(7, "Error password must have 5 character minimum"),
});
