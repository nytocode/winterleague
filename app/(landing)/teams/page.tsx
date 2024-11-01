import { TeamForm } from "@/components/team-form";
import { TeamsList } from "@/components/teams-list";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <TeamForm />
      <Button asChild className="w-full" size={"sm"}>
        <Link href={"/teams/preview"}>
          Vai ai download <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <TeamsList />
    </div>
  );
}
