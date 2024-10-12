"use client";

import { useMutation } from "@tanstack/react-query";
import { OverlayLoader } from "./loader";
import { Button } from "./ui/button";

interface Props {
  match: string;
  played: boolean;
}

export const ChangeMatchStatus = ({ match, played }: Props) => {
  const { mutate: change_status, isPending } = useMutation({
    mutationFn: async (played: boolean) => {
      return await fetch(`/matches/${match}`, {
        method: "PATCH",
        body: JSON.stringify({ played }),
      });
    },
    onSuccess: () => {},
  });

  return (
    <>
      {isPending && <OverlayLoader />}

      {played && (
        <Button
          size={"sm"}
          onClick={() => change_status(false)}
          variant={"outline"}
          className="w-full"
        >
          Giocata
        </Button>
      )}
      {!played && (
        <Button
          size={"sm"}
          onClick={() => change_status(true)}
          className="w-full"
        >
          Da giocare
        </Button>
      )}
    </>
  );
};
