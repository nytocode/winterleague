"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  team: string;
  match: string;
}

export const WinByForfait = ({ team, match }: Props) => {
  const router = useRouter();

  const { mutate: win_by_forfait } = useMutation({
    mutationFn: async () => {
      return await fetch(`/api/matches/${match}/win-by-forfait`, {
        method: "POST",
        body: JSON.stringify({
          team,
        }),
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <Button
      size={"sm"}
      className="w-full text-xs"
      onClick={() => win_by_forfait()}
    >
      Vince a tavolino
    </Button>
  );
};
