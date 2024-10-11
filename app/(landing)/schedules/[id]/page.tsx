import { RoundToggle } from "@/components/round-toogle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  searchParams: { round },
}: Props) {
  const weekly = await db.weeklySchedule.findUnique({
    where: {
      id,
    },
    include: {
      matches: {
        include: {
          teams: true,
        },
      },
    },
  });

  return (
    <div className="py-4 space-y-4">
      <Button asChild className="w-full" size={"sm"}>
        <Link href={`/schedules/${id}/preview`}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <RoundToggle />
      <ul className="space-y-4">
        {weekly?.matches
          .filter((match) => match.round === round)
          .map((match) => (
            <li key={match.id}>
              <Link
                href={`/matches/${match.id}`}
                className="grid grid-cols-11 p-2 items-center border rounded-md shadow-sm"
              >
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
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
