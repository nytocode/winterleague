"use client";

import { GoalFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { OverlayLoader } from "./overlay-loader";
import { useRouter } from "next/navigation";

interface Props {
  players: Prisma.PlayerGetPayload<{
    include: {
      team: true;
    };
  }>[];
  match: string;
}

export const GoalForm = ({ players, match }: Props) => {
  const router = useRouter();
  const { mutate: create_goal, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await fetch("/api/goals", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof GoalFormSchema>>({
    defaultValues: {
      match: match,
      player: "",
    },
    resolver: zodResolver(GoalFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof GoalFormSchema>> = (values) => {
    create_goal(values);
  };

  return (
    <>
      {isPending && <OverlayLoader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="player"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un giocatore" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {players.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        <div className="flex items-center gap-2">
                          <Image
                            src={player.team.logo}
                            alt="team"
                            width={20}
                            height={20}
                          />
                          <span className="flex-1 text-ellipsis overflow-hidden text-xs  font-medium">{`${player.first_name} ${player.last_name}`}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button size={"icon"} type="submit">
            <PlusIcon />
          </Button>
        </form>
      </Form>
    </>
  );
};
