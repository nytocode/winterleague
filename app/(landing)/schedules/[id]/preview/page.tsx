import { RoundToggle } from "@/components/round-toogle";
import { SchedulePost } from "@/components/schedule/schedule-post";
import { ScheduleStory } from "@/components/schedule/schedule-story";
import { TypeToggle } from "@/components/type-toggle";
import { db } from "@/lib/db";
import { Round } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    round: Round;
    type: string;
  };
}

export default async function Page({
  params: { id },
  searchParams: { round = Round.First, type },
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

  if (!weekly) {
    return;
  }

  const matches = weekly?.matches
    .filter((match) => match.round === round)
    .sort(
      (a, b) => a.teams[0].name.charCodeAt(0) - b.teams[0].name.charCodeAt(0),
    );

  return (
    <div className="py-4 flex flex-col gap-4">
      <RoundToggle />
      <TypeToggle />
      {type !== "P" && <ScheduleStory n={weekly.number} matches={matches} />}
      {type === "P" && <SchedulePost n={weekly.number} matches={matches} />}
    </div>
  );
}
