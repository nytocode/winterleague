import { RankingPost } from "@/components/ranking/ranking-post";
import { RankingStory } from "@/components/ranking/ranking-story";
import { TypeToggle } from "@/components/type-toggle";
import { db } from "@/lib/db";
import { Team } from "@prisma/client";

interface Props {
  searchParams: {
    type: string;
  };
}

export default async function Page({ searchParams: { type } }: Props) {
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
    total: number;
  }[] = [];

  teams.forEach((team) => {
    let win = 0;
    let defeat = 0;
    let tie = 0;
    let points = 0;
    let total = 0;
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

      total++;
    });

    ranking.push({
      team: team,
      w: win,
      d: defeat,
      t: tie,
      p: points,
      total: total,
    });

    ranking.sort((a, b) => b.p - a.p);
  });

  return (
    <div className="py-4 flex flex-col gap-4">
      <TypeToggle />
      {type !== "P" && <RankingStory ranking={ranking} />}
      {type === "P" && <RankingPost ranking={ranking} />}
    </div>
  );
}
