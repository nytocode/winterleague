"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import qs from "query-string";

export const TypeToggle = () => {
  const search_params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const type = search_params.get("type");

  const onChange = (type: "S" | "P") => {
    const parsed = qs.parse(search_params.toString());
    parsed["type"] = type;
    router.replace(`${path}?${qs.stringify(parsed)}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className={cn(
          "flex-1 border hover:bg-accent outline-0 active:bg-accent p-2 text-center rounded-md font-medium",
          type !== "P" && "bg-accent",
        )}
        onClick={() => onChange("S")}
      >
        Storia
      </button>
      <button
        className={cn(
          "flex-1 border hover:bg-accent outline-0 active:bg-accent p-2 text-center rounded-md font-medium",
          type === "P" && "bg-accent",
        )}
        onClick={() => onChange("P")}
      >
        Post
      </button>
    </div>
  );
};
