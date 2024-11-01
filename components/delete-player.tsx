"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { OverlayLoader } from "./overlay-loader";

interface Props {
  id: string;
}

export const DeletePlayer = ({ id }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: delete_player, isPending } = useMutation({
    mutationFn: async () => {
      return await fetch(`/api/players/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%]">
        {isPending && <OverlayLoader />}
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro di voler procedere?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center gap-4">
            <Button
              className="flex-1"
              size={"sm"}
              variant={"outline"}
              onClick={() => setOpen(false)}
            >
              Annulla
            </Button>
            <Button
              className="flex-1"
              size={"sm"}
              variant={"destructive"}
              onClick={() => delete_player()}
            >
              Procedi
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
