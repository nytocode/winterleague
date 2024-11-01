"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (dest: string) => {
    router.push(dest);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <aside className="flex flex-col gap-4 items-center">
          <Image
            onClick={() => navigateTo("/")}
            src={"/images/logo.png"}
            alt="logo"
            width={100}
            height={100}
          />
          <ul className="flex flex-col items-stretch w-full gap-4">
            <li>
              <Button
                onClick={() => navigateTo("/teams")}
                className={cn(
                  "w-full border hover:bg-accent active:bg-white",
                  pathname === "/teams" && "bg-accent",
                )}
                variant={"ghost"}
              >
                Lista squadre
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigateTo("/schedules")}
                className={cn(
                  "w-full border hover:bg-accent active:bg-white",
                  pathname === "/schedules" && "bg-accent",
                )}
                variant={"ghost"}
              >
                Calendario
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigateTo("/ranking")}
                className={cn(
                  "w-full border hover:bg-accent active:bg-white",
                  pathname === "/ranking" && "bg-accent",
                )}
                variant={"ghost"}
              >
                Classifica
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigateTo("/scorers-ranking")}
                className={cn(
                  "w-full border hover:bg-accent active:bg-white",
                  pathname === "/scorers-ranking" && "bg-accent",
                )}
                variant={"ghost"}
              >
                Classifica marcatori
              </Button>
            </li>
            <li>
              <Button
                onClick={() => navigateTo("/results")}
                className={cn(
                  "w-full border hover:bg-accent active:bg-white",
                  pathname === "/results" && "bg-accent",
                )}
                variant={"ghost"}
              >
                Risultati
              </Button>
            </li>
          </ul>
        </aside>
      </SheetContent>
    </Sheet>
  );
};
