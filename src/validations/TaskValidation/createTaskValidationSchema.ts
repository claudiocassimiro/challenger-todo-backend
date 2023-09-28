import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, {
    message: "Por favor, escreva um titulo de pelo menos 3 caracteres",
  }),
  description: z.string().optional().nullable(),
  completion_data: z.date(),
  priority: z.enum(["alta", "média", "baixa"]),
});

export type TaskType = z.infer<typeof TaskSchema>;
