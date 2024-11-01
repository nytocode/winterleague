"use client";

import { useMutation } from "@tanstack/react-query";
import { OverlayLoader } from "./overlay-loader";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  match: string;
  played: boolean;
}

export const ChangeMatchStatus = ({ match, played }: Props) => {
  const router = useRouter();

  const { mutate: change_status, isPending } = useMutation({
    mutationFn: async (played: boolean) => {
      return await fetch(`/api/matches/${match}`, {
        method: "PATCH",
        body: JSON.stringify({ played }),
      });
    },
    onSuccess: () => {
      router.refresh();
    },
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
