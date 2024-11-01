import { ScorersRankingPost } from "@/components/scorers-ranking/scorers-ranking-post";
import { ScorersRankingStory } from "@/components/scorers-ranking/scorers-ranking-story";
import { TypeToggle } from "@/components/type-toggle";
import { db } from "@/lib/db";
import _ from "lodash";

interface Props {
  searchParams: {
    type: string;
  };
}

export default async function Page({ searchParams: { type } }: Props) {
  const goals = await db.goal.findMany({
    where: {
      AND: [
        {
          player_id: {
            not: null,
          },
        },
        {
          match: {
            played: true,
          },
        },
      ],
    },
    include: {
      player: {
        include: {
          team: true,
        },
      },
    },
  });

  if (!goals) {
    return null;
  }

  const ranking = _.chain(goals)
    .groupBy((goal) => goal.player_id)
    .map((gbp) => ({
      logo: gbp[0].player?.team.logo ?? "",
      name: `${gbp[0].player?.last_name} ${gbp[0].player?.first_name?.split("")[0]}.`,
      goals: gbp.length,
    }))
    .orderBy((scorer) => scorer.goals)
    .reverse()
    .slice(0, 10)
    .value();

  return (
    <div className="py-4 flex flex-col gap-4">
      <TypeToggle />
      {type !== "P" && <ScorersRankingStory ranking={ranking} />}
      {type === "P" && <ScorersRankingPost ranking={ranking} />}
    </div>
  );
}
