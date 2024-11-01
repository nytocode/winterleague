"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import { TeamFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { ImagePicker } from "./image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { OverlayLoader } from "./overlay-loader";

export const TeamForm = () => {
  const [open, setOpen] = useState(false);
  const query_client = useQueryClient();
  const { mutate: create_team, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetch("/api/teams", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      form.reset();
      setOpen(false);
      query_client.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const form = useForm<z.infer<typeof TeamFormSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(TeamFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof TeamFormSchema>> = (values) => {
    const data = new FormData();

    const { name, logo } = values;
    data.append("name", name);
    data.append("logo", logo);
    create_team(data);
  };

  if (isPending) {
    return <OverlayLoader />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="w-full">
          Aggiungi squadra
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Squadra</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-stretch"
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImagePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Inserisci un nome" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"}>
              Aggiungi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
