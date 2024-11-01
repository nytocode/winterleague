import { GoalForm } from "@/components/goal-form";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Image from "next/image";
import * as _ from "lodash";
import { DeleteGoal } from "@/components/delete-goal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ChangeMatchStatus } from "@/components/change-match-status";
import { WinByForfait } from "@/components/win-by-forfait";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  const match = await db.match.findUnique({
    where: {
      id,
    },
    include: {
      goals: {
        include: {
          player: {
            include: {
              team: true,
            },
          },
        },
      },
      teams: {
        include: {
          players: {
            include: {
              team: true,
            },
          },
        },
      },
    },
  });

  if (!match) {
    return null;
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <ChangeMatchStatus match={id} played={match.played} />
      <div className="grid grid-cols-2 p-2 gap-2">
        <div className="col-span-1 flex flex-col gap-2">
          <div className="overflow-hidden flex items-center h-[60px] gap-2">
            <span className="overflow-hidden flex-1 text-nowrap text-ellipsis text-xs font-medium">
              {match.teams[0].name}
            </span>
            <Image
              src={match.teams[0].logo}
              alt="team-logo"
              width={40}
              height={40}
            />
            <span className="font-bold">
              {
                match.goals.filter((goal) => goal.team_id === match.teams[0].id)
                  .length
              }
            </span>
          </div>
          {!match.played && (
            <WinByForfait match={id} team={match.teams[0].id} />
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <div className="overflow-hidden flex items-center h-[60px] gap-2">
            <span className="font-bold">
              {
                match.goals.filter((goal) => goal.team_id === match.teams[1].id)
                  .length
              }
            </span>
            <Image
              src={match.teams[1].logo}
              alt="team-logo"
              width={40}
              height={40}
            />
            <span className="overflow-hidden flex-1 text-right text-nowrap text-ellipsis text-xs font-medium">
              {match.teams[1].name}
            </span>
          </div>
          {!match.played && (
            <WinByForfait match={id} team={match.teams[1].id} />
          )}
        </div>
      </div>
      <Separator />
      <Button asChild className="w-full" size={"sm"}>
        <Link href={`/matches/${id}/preview`}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <GoalForm
        match={match.id}
        players={[...match.teams[0].players, ...match.teams[1].players]}
      />
      <ul>
        {_.chain(match.goals)
          .filter((goal) => goal.player_id !== null)
          .groupBy((goal) => goal.player?.id)
          .map((gbp, k) => (
            <li key={k} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={gbp[0].player?.team.logo ?? ""}
                  alt="logo"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-sm">
                  {`${gbp[0].player?.last_name} ${gbp[0].player?.first_name?.split("")[0]}.`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {gbp.map((g) => (
                  <Image
                    key={g.id}
                    src={"/images/football.png"}
                    alt="football"
                    width={20}
                    height={20}
                  />
                ))}
                <DeleteGoal id={gbp[0].id} />
              </div>
            </li>
          ))
          .value()}
      </ul>
    </div>
  );
}
