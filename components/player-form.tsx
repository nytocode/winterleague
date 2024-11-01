"use client";

import { PlayerFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Player } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { ImagePicker } from "./image-picker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { OverlayLoader } from "./overlay-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  team: string;
  player?: Player;
  children: React.ReactNode;
}

export const PlayerForm = ({ player, team, children }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { mutate: create_player, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetch("/api/players", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      setOpen(false);
      form.reset({
        first_name: player?.first_name ?? "",
        last_name: player?.last_name ?? "",
        team: team,
      });
      router.refresh();
    },
  });

  const { mutate: update_player } = useMutation({
    mutationFn: async (data: FormData) => {
      return await fetch(`/api/players/${player?.id}`, {
        method: "PATCH",
        body: data,
      });
    },
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof PlayerFormSchema>>({
    defaultValues: {
      first_name: player?.first_name ?? "",
      last_name: player?.last_name ?? "",
      team: team,
    },
    resolver: zodResolver(PlayerFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof PlayerFormSchema>> = (
    values,
  ) => {
    const data = new FormData();

    const { first_name, last_name, image, team } = values;
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("image", image);
    data.append("team", team);
    if (player) {
      update_player(data);
    } else {
      create_player(data);
    }
  };

  if (isPending) {
    return <OverlayLoader />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Giocatore</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-stretch"
          >
            <FormField
              control={form.control}
              name="image"
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Inserisci un nome" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Inserisci un cognome" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size={"sm"}>
              Procedi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
