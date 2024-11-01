"use client";

import { Prisma, Round } from "@prisma/client";
import download from "downloadjs";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { numberToRoman } from "@/lib/utils";

interface Props {
  n: number;
  matches: Prisma.MatchGetPayload<{
    include: {
      teams: true;
      goals: {
        include: {
          team: true;
        };
      };
    };
  }>[];
}

export const ResultsStory = ({ matches, n }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bg = new Image();
    bg.src = "/images/base-story.jpg";
    bg.crossOrigin = "anonymous";
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0);

      const logo = new Image();
      logo.src = "/images/logo.png";
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        ctx.drawImage(logo, canvas.width / 2 - 85, 20, 170, 170);
      };

      const font = new FontFace(
        "Righteous",
        "url(/fonts/Righteous-Regular.ttf)",
      );

      font.load().then((f) => {
        document.fonts.add(f);

        ctx.font = "64px Righteous";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#CBA84E";
        ctx.fillText(
          "WINTER LEAGUE",
          canvas.width / 2 - ctx.measureText("WINTER LEAGUE").width / 2,
          230,
        );
        ctx.font = "32px Righteous";
        ctx.fillText(
          "2024/2025",
          canvas.width / 2 - ctx.measureText("2024/2025").width / 2,
          325,
        );
        ctx.fillText(
          `GIORNATA ${numberToRoman(n)}`,
          canvas.width / 2 -
            ctx.measureText(`GIORNATA ${numberToRoman(n)}`).width / 2,
          370,
        );

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 170, 310);
        ctx.lineTo(canvas.width / 2 + 170, 310);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#CBA84E";
        ctx.stroke();

        matches.forEach((match, i) => {
          ctx.fillStyle = "#FFF";
          ctx.fillRect(50, 600 + 120 * i, 400, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(50, 600 + 120 * i, 400, 70);
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = "#FFF";
          ctx.fillRect(canvas.width / 2 - 70, 600 + 120 * i, 140, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width / 2 - 70, 600 + 120 * i, 140, 70);
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = "#FFF";
          ctx.fillRect(canvas.width - 450, 600 + 120 * i, 400, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width - 450, 600 + 120 * i, 400, 70);
          ctx.lineWidth = 2;
          ctx.stroke();

          const teams = [...match.teams];
          if (match.round === Round.Second) {
            teams.reverse();
          }

          const result = match.played
            ? `${match.goals.filter((goal) => goal.team.id === teams[0].id).length} - ${match.goals.filter((goal) => goal.team.id === teams[1].id).length}`
            : "-";

          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(
            result,
            canvas.width / 2 - ctx.measureText(result).width / 2,
            640 + 120 * i,
          );

          // HOME TEAM
          const teamLogo1 = new Image();
          teamLogo1.src = teams[0].logo;
          teamLogo1.crossOrigin = "anonymous";
          teamLogo1.onload = () => {
            ctx.drawImage(
              teamLogo1,
              70,
              635 - 25 * (teamLogo1.height / teamLogo1.width) + 120 * i,
              50,
              50 * (teamLogo1.height / teamLogo1.width),
            );
          };

          ctx.fillText(teams[0].name, 140, 640 + 120 * i);

          // AWAY TEAM
          const teamLogo2 = new Image();
          teamLogo2.src = teams[1].logo;
          teamLogo2.crossOrigin = "anonymous";
          teamLogo2.onload = () => {
            ctx.drawImage(
              teamLogo2,
              canvas.width - 425,
              635 - 25 * (teamLogo2.height / teamLogo2.width) + 120 * i,
              50,
              50 * (teamLogo2.height / teamLogo2.width),
            );
          };

          ctx.fillText(teams[1].name, canvas.width - 350, 640 + 120 * i);
        });
      });
    };
  }, [ref, matches, n]);

  const onDownload = () => {
    const canvas = ref.current;
    if (canvas) {
      download(
        canvas.toDataURL("image/jpeg", 1.0),
        "giornata.jpg",
        "image/jpeg",
      );
    }
  };

  return (
    <div className="w-full space-y-4">
      <Button size={"sm"} className="w-full" onClick={onDownload}>
        Scarica
        <Download className="ml-2 h-4 w-4" />
      </Button>
      <canvas
        ref={ref}
        width={"1080px"}
        height={"1920px"}
        className="aspect-[9/16] max-w-full"
      />
    </div>
  );
};
