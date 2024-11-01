import { RoundToggle } from "@/components/round-toogle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Round } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    round: Round;
  };
}

export default async function Page({
  params: { id },
  searchParams: { round = Round.First },
}: Props) {
  const weekly = await db.weeklySchedule.findUnique({
    where: {
      id,
    },
    include: {
      matches: {
        include: {
          teams: true,
          goals: {
            include: {
              team: true,
            },
          },
        },
      },
    },
  });
  console.log(weekly?.matches.map((m) => m.goals));

  return (
    <div className="py-4 flex flex-col gap-4">
      <Button asChild className="w-full" size={"sm"}>
        <Link href={`/results/${id}/preview`}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <RoundToggle />
      <ul className="space-y-4">
        {weekly?.matches
          .filter((match) => match.round === round && match)
          .sort(
            (a, b) =>
              a.teams[0].name.charCodeAt(0) - b.teams[0].name.charCodeAt(0),
          )
          .map((match) => {
            const teams = [...match.teams];
            if (match.round === Round.Second) {
              teams.reverse();
            }
            return (
              <li key={match.id}>
                <Link
                  href={`/matches/${match.id}`}
                  className="grid grid-cols-12 p-2 items-center border rounded-md shadow-sm"
                >
                  <div className="col-span-5 overflow-hidden flex items-center gap-2">
                    <span className="overflow-hidden flex-1 text-nowrap text-ellipsis text-xs font-medium">
                      {teams[0].name}
                    </span>
                    <Image
                      src={teams[0].logo}
                      alt="team-logo"
                      width={40}
                      height={40}
                    />
                  </div>
                  {match.played ? (
                    <span className="col-span-2 text-center font-bold">
                      {
                        match.goals.filter(
                          (goal) => goal.team.id === teams[0].id,
                        ).length
                      }{" "}
                      -{" "}
                      {
                        match.goals.filter(
                          (goal) => goal.team.id === teams[1].id,
                        ).length
                      }
                    </span>
                  ) : (
                    <span className="col-span-2 text-center font-bold">-</span>
                  )}
                  <div className="col-span-5 overflow-hidden flex items-center gap-2">
                    <Image
                      src={teams[1].logo}
                      alt="team-logo"
                      width={40}
                      height={40}
                    />
                    <span className="overflow-hidden flex-1 text-right text-nowrap text-ellipsis text-xs font-medium">
                      {teams[1].name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
