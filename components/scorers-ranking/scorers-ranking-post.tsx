"use client";

import download from "downloadjs";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface Props {
  ranking: {
    name: string;
    goals: number;
    logo: string;
  }[];
}

export const ScorersRankingPost = ({ ranking }: Props) => {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;

    const bg = new Image();
    bg.src = "/images/base-portrait.jpg";
    bg.crossOrigin = "anonymous";
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0);

      const logo = new Image();
      logo.src = "/images/logo.png";
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        ctx.drawImage(logo, width / 2 - 85, 20, 170, 170);

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
            width / 2 - ctx.measureText("WINTER LEAGUE").width / 2,
            200,
          );

          ctx.beginPath();
          ctx.moveTo(width / 2 - 170, 270);
          ctx.lineTo(width / 2 + 170, 270);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#CBA84E";
          ctx.stroke();

          ctx.font = "32px Righteous";
          ctx.fillText(
            "2024/2025",
            width / 2 - ctx.measureText("2024/2025").width / 2,
            290,
          );
          ctx.fillText(
            "MARCATORI",
            width / 2 - ctx.measureText("MARCATORI").width / 2,
            340,
          );

          ranking.forEach((rank, i) => {
            if (i < 5) {
              ctx.fillStyle = "#CBA84E";
              ctx.fillRect(width / 2 - 510, 540 + 95 * i, 70, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 - 510, 540 + 95 * i, 70, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(
                (i + 1).toString(),
                width / 2 - 475 - ctx.measureText((i + 1).toString()).width / 2,
                575 + 95 * i,
              );

              ctx.fillStyle = "#FFF";
              ctx.fillRect(width / 2 - 430, 540 + 95 * i, 340, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 - 430, 540 + 95 * i, 340, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              const teamLogo = new Image();
              teamLogo.src = rank.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx.drawImage(
                  teamLogo,
                  width / 2 - 405,
                  575 - 25 * (teamLogo.height / teamLogo.width) + 95 * i,
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(rank.name, width / 2 - 335, 580 + 95 * i);

              ctx.fillStyle = "#FFF";
              ctx.fillRect(width / 2 - 80, 540 + 95 * i, 70, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 - 80, 540 + 95 * i, 70, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(
                rank.goals.toString(),
                width / 2 -
                  45 -
                  ctx.measureText(rank.goals.toString()).width / 2,
                575 + 95 * i,
              );
            } else {
              const j = i - 5;

              ctx.fillStyle = "#CBA84E";
              ctx.fillRect(width / 2 + 10, 540 + 95 * j, 70, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 + 10, 540 + 95 * j, 70, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(
                (i + 1).toString(),
                width / 2 + 45 - ctx.measureText((i + 1).toString()).width / 2,
                575 + 95 * j,
              );

              ctx.fillStyle = "#FFF";
              ctx.fillRect(width / 2 + 90, 540 + 95 * j, 340, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 + 90, 540 + 95 * j, 340, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              const teamLogo = new Image();
              teamLogo.src = rank.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx.drawImage(
                  teamLogo,
                  width / 2 + 115,
                  575 - 25 * (teamLogo.height / teamLogo.width) + 95 * j,
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(rank.name, width / 2 + 185, 580 + 95 * j);

              ctx.fillStyle = "#FFF";
              ctx.fillRect(width / 2 + 440, 540 + 95 * j, 70, 70);
              ctx.fillStyle = "#CBA84E";
              ctx.strokeRect(width / 2 + 440, 540 + 95 * j, 70, 70);
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
              ctx.fillText(
                rank.goals.toString(),
                width / 2 +
                  475 -
                  ctx.measureText(rank.goals.toString()).width / 2,
                575 + 95 * j,
              );
            }
          });
        });
      };
    };
  }, [ranking, canvas_ref]);

  const onDownload = () => {
    const canvas = canvas_ref.current;

    if (canvas) {
      download(
        canvas.toDataURL("image/jpeg", 1.0),
        "marcatori.jpg",
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
        ref={canvas_ref}
        width={"1080px"}
        height={"1350px"}
        className="aspect-[4/5] max-w-full"
      />
    </div>
  );
};
