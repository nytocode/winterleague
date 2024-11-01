"use client";

import { WeeklyScheduleFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Team } from "@prisma/client";
import { Separator } from "./ui/separator";
import { OverlayLoader } from "./overlay-loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

const matches = new Array(7).fill(0).map(() => ({
  home: "",
  away: "",
}));

export const WeeklyScheduleForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await fetch("/api/teams");
      const data = await res.json();

      return data.teams as Team[];
    },
  });

  const { mutate: create_schedule, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await fetch("/api/weekly-schedules", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess() {
      setOpen(false);
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof WeeklyScheduleFormSchema>>({
    defaultValues: {
      matches,
    },
    resolver: zodResolver(WeeklyScheduleFormSchema),
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "matches",
  });

  const onSubmit: SubmitHandler<z.infer<typeof WeeklyScheduleFormSchema>> = (
    values,
  ) => {
    create_schedule(values);
  };

  if (isPending) {
    return <OverlayLoader />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          Aggiungi giornata
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogTitle className="text-center">Giornata</DialogTitle>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            {fields.map((_field, i) => (
              <div key={i} className="grid grid-cols-2 text-xs gap-2">
                <FormField
                  control={form.control}
                  name={`matches.${i}.home`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona squadra" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams?.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`matches.${i}.away`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona squadra" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams?.map((team) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button className="w-full" type="submit" size={"sm"}>
              Procedi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
