import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Image from "next/image";

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
      teams: true,
    },
  });

  if (!match) {
    return null;
  }

  return (
    <div className="py-4 space-y-4">
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
    </div>
  );
}
