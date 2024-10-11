"use client";

import { Team } from "@prisma/client";
import download from "downloadjs";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface Props {
  teams: Team[];
}

export const TeamsListStory = ({ teams }: Props) => {
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
          "SQUADRE",
          canvas.width / 2 - ctx.measureText("SQUADRE").width / 2,
          370,
        );

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 170, 310);
        ctx.lineTo(canvas.width / 2 + 170, 310);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#CBA84E";
        ctx.stroke();

        teams.forEach((team, i) => {
          ctx.fillStyle = "#FFF";
          ctx.fillRect(canvas.width / 2 - 250, 460 + 95 * i, 500, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width / 2 - 250, 460 + 95 * i, 500, 70);
          ctx.lineWidth = 2;
          ctx.stroke();
          const teamLogo = new Image();
          teamLogo.src = team.logo;
          teamLogo.crossOrigin = "anonymous";
          teamLogo.onload = () => {
            ctx.drawImage(
              teamLogo,
              canvas.width / 2 - 225,
              495 - 25 * (teamLogo.height / teamLogo.width) + 95 * i,
              50,
              50 * (teamLogo.height / teamLogo.width),
            );
          };

          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(
            team.name,

            canvas.width / 2 - 155,
            500 + 95 * i,
          );
        });
      });
    };
  }, [ref, teams]);

  const onDownload = () => {
    const canvas = ref.current;
    if (canvas) {
      download(
        canvas.toDataURL("image/jpeg", 1.0),
        "lista-squadre.jpg",
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
