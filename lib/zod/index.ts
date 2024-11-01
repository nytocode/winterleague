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

export const PlayerFormSchema = z.object({
  id: z.string().optional(),
  team: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string(),
  image: z.any(),
});

export const GoalFormSchema = z.object({
  id: z.string().optional(),
  player: z.string().optional(),
  match: z.string(),
});
