import { cn } from "@/lib/utils";
import { Righteous } from "next/font/google";
import { Separator } from "./ui/separator";

const font = Righteous({
  subsets: ["latin"],
  weight: ["400"],
});

export const PostHeader = () => {
  return (
    <div className={cn(font.className, "flex flex-col items-center gap-1")}>
      <div className="h-[60px] w-[60px] bg-[url('/images/logo.png')] bg-contain bg-center" />
      <h1 className="text-[#CBA84E] tracking-wider text-lg">WINTER LEAGUE</h1>
      <Separator className="bg-[#CBA84E] h-[2px]" />
      <h2 className="text-[#CBA84E] text-sm">2024/2025</h2>
    </div>
  );
};
