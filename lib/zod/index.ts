import { z } from "zod";

export const TeamFormSchema = z.object({
  name: z.string().min(1, "Nome obbligatorio"),
  logo: z.any().refine((val) => {
    return val !== undefined;
  }, "Aggiungi un'immagine valida come logo"),
});

export const MatchFormSchema = z.object({
  id: z.string().optional(),
  home: z.string().min(1),
  away: z.string().min(1),
});

export const WeeklyScheduleFormSchema = z.object({
  id: z.string().optional(),
  schedule: z.string().optional(),
  matches: z.array(MatchFormSchema),
});
