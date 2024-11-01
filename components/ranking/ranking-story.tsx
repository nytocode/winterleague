"use client";

import download from "downloadjs";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { Team } from "@prisma/client";

interface Props {
  ranking: {
    team: Team;
    w: number;
    d: number;
    t: number;
    p: number;
    total: number;
  }[];
}

export const RankingStory = ({ ranking }: Props) => {
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
          "CLASSIFICA",
          canvas.width / 2 - ctx.measureText("CLASSIFICA").width / 2,
          370,
        );

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 170, 310);
        ctx.lineTo(canvas.width / 2 + 170, 310);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#CBA84E";
        ctx.stroke();

        ranking.forEach((rank, i) => {
          ctx.fillStyle = "#CBA84E";
          ctx.fillRect(canvas.width / 2 - 320, 550 + 90 * i, 70, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width / 2 - 320, 550 + 90 * i, 70, 70);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(
            (i + 1).toString(),
            canvas.width / 2 -
              285 -
              ctx.measureText((i + 1).toString()).width / 2,
            590 + 90 * i,
          );

          ctx.fillStyle = "#FFF";
          ctx.fillRect(canvas.width / 2 - 230, 550 + 90 * i, 450, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width / 2 - 230, 550 + 90 * i, 450, 70);
          ctx.lineWidth = 2;
          ctx.stroke();
          const teamLogo = new Image();
          teamLogo.src = rank.team.logo;
          teamLogo.crossOrigin = "anonymous";
          teamLogo.onload = () => {
            ctx.drawImage(
              teamLogo,
              canvas.width / 2 - 205,
              585 - 25 * (teamLogo.height / teamLogo.width) + 90 * i,
              50,
              50 * (teamLogo.height / teamLogo.width),
            );
          };

          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(rank.team.name, canvas.width / 2 - 130, 590 + 90 * i);

          ctx.fillStyle = "#FFF";
          ctx.fillRect(canvas.width / 2 + 240, 550 + 90 * i, 70, 70);
          ctx.fillStyle = "#CBA84E";
          ctx.strokeRect(canvas.width / 2 + 240, 550 + 90 * i, 70, 70);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(
            rank.p.toString(),
            canvas.width / 2 +
              275 -
              ctx.measureText(rank.p.toString()).width / 2,
            590 + 90 * i,
          );
        });
      });
    };
  }, [ref, ranking]);

  const onDownload = () => {
    const canvas = ref.current;
    if (canvas) {
      download(
        canvas.toDataURL("image/jpeg", 1.0),
        "classifica.jpg",
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
