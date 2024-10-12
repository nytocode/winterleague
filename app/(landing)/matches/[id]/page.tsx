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
    <div className="py-4 space-y-4">
      <ChangeMatchStatus match={id} played={match.played} />
      <div className="grid grid-cols-11 p-2 items-center">
        <div className="col-span-5 overflow-hidden flex items-center gap-2">
          <span className="overflow-hidden flex-1 text-nowrap text-ellipsis text-xs font-medium">
            {match.teams[0].name}
          </span>
          <Image
            src={match.teams[0].logo}
            alt="team-logo"
            width={40}
            height={40}
          />
        </div>
        <span className="col-span-1 text-center font-bold">-</span>
        <div className="col-span-5 overflow-hidden flex items-center gap-2">
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
          .groupBy((goal) => goal.player.id)
          .map((gbp, k) => (
            <li key={k} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={gbp[0].player.team.logo}
                  alt="logo"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-sm">
                  {`${gbp[0].player.last_name} ${gbp[0].player.last_name?.split("")[0]}.`}
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
