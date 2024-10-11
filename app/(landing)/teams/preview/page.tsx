import { TeamsListPost } from "@/components/teams-list/teams-list-post";
import { TeamsListStory } from "@/components/teams-list/teams-list-story";
import { TypeToggle } from "@/components/type-toggle";
import { db } from "@/lib/db";

interface Props {
  searchParams: {
    type: string;
  };
}

export default async function Page({ searchParams: { type } }: Props) {
  const teams = await db.team.findMany({});

  return (
    <div className="py-4 space-y-4">
      <TypeToggle />
      {type === "P" && <TeamsListPost teams={teams} />}
      {(type === undefined || type === "S") && <TeamsListStory teams={teams} />}
    </div>
  );
}
