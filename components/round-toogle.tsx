"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { Round } from "@prisma/client";

export const RoundToggle = () => {
  const search_params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const round = search_params.get("round");

  const onChange = (round: Round) => {
    const parsed = qs.parse(search_params.toString());
    parsed["round"] = round;
    router.replace(`${path}?${qs.stringify(parsed)}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className={cn(
          "flex-1 border hover:bg-accent outline-0 active:bg-accent p-2 text-center rounded-md font-medium",
          round !== Round.Second && "bg-accent",
        )}
        onClick={() => onChange(Round.First)}
      >
        Andata
      </button>
      <button
        className={cn(
          "flex-1 border hover:bg-accent outline-0 active:bg-accent p-2 text-center rounded-md font-medium",
          round === Round.Second && "bg-accent",
        )}
        onClick={() => onChange(Round.Second)}
      >
        Ritorno
      </button>
    </div>
  );
};
