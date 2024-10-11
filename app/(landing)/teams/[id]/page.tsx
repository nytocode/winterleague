import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
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
      {team.players.length > 0 && (
        <>
          <h2>Lista giocatori</h2>
          <ul>
            {team.players.map((player) => (
              <li key={player.id}>
                {player.image && (
                  <Image
                    src={player.image}
                    alt="player"
                    width={30}
                    height={30}
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
