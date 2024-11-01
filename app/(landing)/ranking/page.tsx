import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Team } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const matches = await db.match.findMany({
    where: {
      played: true,
    },
    include: {
      teams: true,
      goals: {
        include: {
          player: {
            include: {
              team: true,
            },
          },
        },
      },
    },
  });

  const teams = await db.team.findMany({});

  if (!matches || !teams) {
    return null;
  }

  const ranking: {
    team: Team;
    w: number;
    d: number;
    t: number;
    p: number;
    goals_diff: number;
    total: number;
  }[] = [];

  teams.forEach((team) => {
    let win = 0;
    let defeat = 0;
    let tie = 0;
    let points = 0;
    let total = 0;
    let goals_diff = 0;
    const team_matches = matches.filter((match) =>
      match.teams.some((t) => t.id === team.id),
    );

    team_matches.forEach((match) => {
      const total_goals = match.goals.length;
      const team_goals = match.goals.filter(
        (goal) => goal.team_id === team.id,
      ).length;

      if (team_goals > total_goals - team_goals) {
        win++;
        points += 3;
      }

      if (team_goals < total_goals - team_goals) {
        defeat++;
      }

      if (team_goals === total_goals - team_goals) {
        tie++;
        points += 1;
      }

      goals_diff += team_goals - (total_goals - team_goals);

      total++;
    });

    ranking.push({
      team: team,
      w: win,
      d: defeat,
      t: tie,
      p: points,
      goals_diff: goals_diff,
      total: total,
    });

    ranking.sort((a, b) => {
      if (b.p - a.p === 0) {
        return b.goals_diff - a.goals_diff;
      }
      return b.p - a.p;
    });
  });

  return (
    <div className="py-4 flex flex-col gap-4">
      <Button asChild className="w-full" size={"sm"}>
        <Link href={"/ranking/preview"}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <ul>
        <li className="grid grid-cols-9 items-center">
          <span className="col-span-4 font-medium">Squadra</span>
          <span className="col-span-1 font-medium text-center">V</span>
          <span className="col-span-1 font-medium text-center">S</span>
          <span className="col-span-1 font-medium text-center">P</span>
          <span className="col-span-2 text-xs font-medium text-center">
            Punti
          </span>
        </li>
        <Separator />
        {ranking.map((team) => (
          <li key={team.team.id} className="grid grid-cols-9 items-center py-2">
            <div className="flex items-center overflow-hidden gap-2 col-span-4">
              <Image src={team.team.logo} alt="logo" width={30} height={30} />
              <span className="font-medium text-xs flex-1 text-ellipsis text-nowrap overflow-hidden">
                {team.team.name}
              </span>
            </div>
            <span className="col-span-1 font-medium text-center">{team.w}</span>
            <span className="col-span-1 font-medium text-center">{team.d}</span>
            <span className="col-span-1 font-medium text-center">{team.t}</span>
            <span className="col-span-2 font-medium text-center">{team.p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
