import { DeletePlayer } from "@/components/delete-player";
import { PlayerForm } from "@/components/player-form";
import { ProfilePicPlaceholder } from "@/components/profile-pic-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { EditIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  const team = await db.team.findUnique({
    where: { id },
    include: {
      players: true,
    },
  });

  if (!team) {
    return null;
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-col items-center gap-2">
        <Image src={team.logo} alt="logo" width={50} height={50} />
        <span className="font-semibold text-lg">{team.name}</span>
      </div>
      <Separator />
      <PlayerForm team={team.id}>
        <Button size={"sm"} className="w-full">
          Aggiungi giocatore
        </Button>
      </PlayerForm>
      {team.players.length > 0 && (
        <>
          <ul>
            {team.players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between border shadow-sm p-1 text-sm rounded-md"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={player.image ?? ""} alt="profile-pic" />
                    <AvatarFallback className="capitalize">
                      {`${player.first_name.split("")[0]}${player.last_name?.split("")[0]}`}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{`${player.first_name} ${player.last_name}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayerForm team={team.id} player={player}>
                    <Button size={"icon"} variant={"ghost"}>
                      <EditIcon className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PlayerForm>
                  <DeletePlayer id={player.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
