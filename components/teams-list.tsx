"use client";

import { Team } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { OverlayLoader } from "./overlay-loader";

export const TeamsList = () => {
  const { data: teams, isPending } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await fetch("/api/teams");
      const data = await res.json();

      return data.teams as Team[];
    },
  });

  if (isPending || !teams) {
    return <OverlayLoader />;
  }

  if (teams.length === 0) {
    return <div>Nessuna squadra</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Lista squadre</h2>
      <ul className="flex flex-col gap-4">
        {teams?.map((team) => (
          <li key={team.id}>
            <Link
              href={`/teams/${team.id}`}
              className="flex p-2 items-center gap-4 border rounded-sm shadow-sm justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundImage: `url(${team.logo})` }}
                  className={`h-[50px] w-[50px] bg-contain bg-no-repeat bg-center`}
                />
                <span className="font-semibold">{team.name}</span>
              </div>
              <ChevronRight />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
