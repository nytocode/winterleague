import { cn } from "@/lib/utils";
import { Team } from "@prisma/client";
import { Righteous } from "next/font/google";

const font = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

interface Props {
  team: Team;
}

export const TeamBox = ({ team }: Props) => {
  return (
    <div className="flex py-0.5 px-3 border border-[#CBA84E] bg-white flex-1 items-center gap-2">
      <div
        style={{ backgroundImage: `url(${team.logo})` }}
        className="h-[20px] w-[20px] bg-contain bg-no-repeat bg-center"
      />
      <span className={cn(font.className, "text-sm")}>{team.name}</span>
    </div>
  );
};
