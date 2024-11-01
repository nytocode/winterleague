import { db } from "@/lib/db";
import { numberToRoman } from "@/lib/utils";
import { Round } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const schedule = await db.schedule.findFirst({
    include: {
      weekly_schedules: true,
    },
  });

  return (
    <div className="py-4 flex flex-col gap-4">
      <ul className="space-y-4">
        {schedule?.weekly_schedules.map((weekly) => (
          <li key={weekly.id}>
            <Link
              className="flex items-center justify-between rounded-sm p-3 border"
              href={`/results/${weekly.id}?round=${Round.First}`}
            >
              <span className="font-medium">{`Giornata ${numberToRoman(weekly.number)}`}</span>
              <ChevronRight />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
