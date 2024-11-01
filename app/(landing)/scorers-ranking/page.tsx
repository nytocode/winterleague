import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import _ from "lodash";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
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

  console.log(goals);

  return (
    <div className="py-4 flex flex-col gap-4">
      <Button asChild className="w-full" size={"sm"}>
        <Link href={"/scorers-ranking/preview"}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <ul className="flex flex-col gap-2">
        {_.chain(goals)
          .groupBy((goal) => goal.player_id)
          .map((gbp) => ({
            logo: gbp[0].player?.team.logo,
            name: `${gbp[0].player?.last_name} ${gbp[0].player?.last_name?.split("")[0]}.`,
            goals: gbp.length,
          }))
          .orderBy((scorer) => scorer.goals)
          .reverse()
          .slice(0, 10)
          .map((scorer, k) => (
            <li
              key={k}
              className="flex items-center justify-between border shadow-sm p-2 rounded-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={scorer.logo ?? ""}
                  alt="logo"
                  width={20}
                  height={20}
                />
                <span className="font-medium text-sm">{scorer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{scorer.goals}</span>
                <Image
                  src={"/images/football.png"}
                  alt="football"
                  width={20}
                  height={20}
                />
              </div>
            </li>
          ))
          .value()}
      </ul>
    </div>
  );
}
