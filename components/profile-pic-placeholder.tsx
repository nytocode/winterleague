import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import { HTMLAttributes } from "react";

export const ProfilePicPlaceholder = ({
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("rounded-full bg-secondary shadow-sm h-30 w-30", className)}
    >
      <PersonIcon />
    </div>
  );
};
