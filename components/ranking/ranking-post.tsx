"use client";

import { Team } from "@prisma/client";
import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import download from "downloadjs";

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

export const RankingPost = ({ ranking }: Props) => {
  const canvas_ref_1 = useRef<HTMLCanvasElement>(null);
  const canvas_ref_2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // CANVAS #1
    const canvas_1 = canvas_ref_1.current;
    if (!canvas_1) return;
    const ctx_1 = canvas_1.getContext("2d");
    if (!ctx_1) return;

    // CANVAS #2
    const canvas_2 = canvas_ref_2.current;
    if (!canvas_2) return;
    const ctx_2 = canvas_2.getContext("2d");
    if (!ctx_2) return;

    const width = canvas_1.width;
    const height = canvas_1.height;

    const bg = new Image();
    bg.src = "/images/base-portrait.jpg";
    bg.crossOrigin = "anonymous";
    bg.onload = () => {
      ctx_1.drawImage(bg, 0, 0);
      ctx_2.drawImage(bg, 0, 0);

      const logo = new Image();
      logo.src = "/images/logo.png";
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        ctx_1.drawImage(logo, width / 2 - 85, 20, 170, 170);
        ctx_2.drawImage(logo, width / 2 - 85, 20, 170, 170);

        const font = new FontFace(
          "Righteous",
          "url(/fonts/Righteous-Regular.ttf)",
        );
        font.load().then((f) => {
          document.fonts.add(f);
          ctx_1.font = "64px Righteous";
          ctx_2.font = "64px Righteous";
          ctx_1.textBaseline = "top";
          ctx_2.textBaseline = "top";
          ctx_1.fillStyle = "#CBA84E";
          ctx_2.fillStyle = "#CBA84E";
          ctx_1.fillText(
            "WINTER LEAGUE",
            width / 2 - ctx_1.measureText("WINTER LEAGUE").width / 2,
            200,
          );
          ctx_2.fillText(
            "WINTER LEAGUE",
            width / 2 - ctx_2.measureText("WINTER LEAGUE").width / 2,
            200,
          );

          ctx_2.beginPath();
          ctx_2.moveTo(width / 2 - 170, 270);
          ctx_2.lineTo(width / 2 + 170, 270);
          ctx_2.lineWidth = 2;
          ctx_2.strokeStyle = "#CBA84E";
          ctx_2.stroke();

          ctx_1.beginPath();
          ctx_1.moveTo(width / 2 - 170, 270);
          ctx_1.lineTo(width / 2 + 170, 270);
          ctx_1.lineWidth = 2;
          ctx_1.strokeStyle = "#CBA84E";
          ctx_1.stroke();

          ctx_1.font = "32px Righteous";
          ctx_2.font = "32px Righteous";
          ctx_2.fillText(
            "2024/2025",
            width / 2 - ctx_2.measureText("2024/2025").width / 2,
            290,
          );
          ctx_1.fillText(
            "2024/2025",
            width / 2 - ctx_1.measureText("2024/2025").width / 2,
            290,
          );
          ctx_1.fillText(
            "CLASSIFICA",
            width / 2 - ctx_1.measureText("CLASSIFICA").width / 2,
            340,
          );

          ctx_2.fillText(
            "CLASSIFICA",
            width / 2 - ctx_1.measureText("CLASSIFICA").width / 2,
            340,
          );

          // WIN, DEFEAT, TIE, POINTS
          ctx_1.fillStyle = "#FFF";
          ctx_1.fillRect(600, 450, 70, 70);
          ctx_1.fillStyle = "#CBA84E";
          ctx_1.strokeRect(600, 450, 70, 70);
          ctx_1.lineWidth = 2;
          ctx_1.stroke();
          ctx_1.textBaseline = "middle";
          ctx_1.fillStyle = "#000";
          ctx_1.fillText("V", 635 - ctx_1.measureText("V").width / 2, 485);

          ctx_1.fillStyle = "#FFF";
          ctx_1.fillRect(700, 450, 70, 70);
          ctx_1.fillStyle = "#CBA84E";
          ctx_1.strokeRect(700, 450, 70, 70);
          ctx_1.lineWidth = 2;
          ctx_1.stroke();
          ctx_1.textBaseline = "middle";
          ctx_1.fillStyle = "#000";
          ctx_1.fillText("S", 735 - ctx_1.measureText("S").width / 2, 485);

          ctx_1.fillStyle = "#FFF";
          ctx_1.fillRect(800, 450, 70, 70);
          ctx_1.fillStyle = "#CBA84E";
          ctx_1.strokeRect(800, 450, 70, 70);
          ctx_1.lineWidth = 2;
          ctx_1.stroke();
          ctx_1.textBaseline = "middle";
          ctx_1.fillStyle = "#000";
          ctx_1.fillText("P", 835 - ctx_1.measureText("P").width / 2, 485);

          ctx_1.fillStyle = "#FFF";
          ctx_1.fillRect(900, 450, 70, 70);
          ctx_1.fillStyle = "#CBA84E";
          ctx_1.strokeRect(900, 450, 70, 70);
          ctx_1.lineWidth = 2;
          ctx_1.stroke();
          ctx_1.textBaseline = "middle";
          ctx_1.fillStyle = "#000";
          ctx_1.fillText("P", 935 - ctx_1.measureText("P").width / 2, 485);

          ctx_2.fillStyle = "#FFF";
          ctx_2.fillRect(600, 450, 70, 70);
          ctx_2.fillStyle = "#CBA84E";
          ctx_2.strokeRect(600, 450, 70, 70);
          ctx_2.lineWidth = 2;
          ctx_2.stroke();
          ctx_2.textBaseline = "middle";
          ctx_2.fillStyle = "#000";
          ctx_2.fillText("V", 635 - ctx_2.measureText("V").width / 2, 485);

          ctx_2.fillStyle = "#FFF";
          ctx_2.fillRect(700, 450, 70, 70);
          ctx_2.fillStyle = "#CBA84E";
          ctx_2.strokeRect(700, 450, 70, 70);
          ctx_2.lineWidth = 2;
          ctx_2.stroke();
          ctx_2.textBaseline = "middle";
          ctx_2.fillStyle = "#000";
          ctx_2.fillText("S", 735 - ctx_2.measureText("S").width / 2, 485);

          ctx_2.fillStyle = "#FFF";
          ctx_2.fillRect(800, 450, 70, 70);
          ctx_2.fillStyle = "#CBA84E";
          ctx_2.strokeRect(800, 450, 70, 70);
          ctx_2.lineWidth = 2;
          ctx_2.stroke();
          ctx_2.textBaseline = "middle";
          ctx_2.fillStyle = "#000";
          ctx_2.fillText("P", 835 - ctx_2.measureText("P").width / 2, 485);

          ctx_2.fillStyle = "#FFF";
          ctx_2.fillRect(900, 450, 70, 70);
          ctx_2.fillStyle = "#CBA84E";
          ctx_2.strokeRect(900, 450, 70, 70);
          ctx_2.lineWidth = 2;
          ctx_2.stroke();
          ctx_2.textBaseline = "middle";
          ctx_2.fillStyle = "#000";
          ctx_2.fillText("P", 935 - ctx_2.measureText("P").width / 2, 485);

          ranking.forEach((rank, i) => {
            if (i < 7) {
              ctx_1.fillStyle = "#FFF";
              ctx_1.fillRect(100, 540 + 95 * i, 450, 70);
              ctx_1.fillStyle = "#CBA84E";
              ctx_1.strokeRect(100, 540 + 95 * i, 450, 70);
              ctx_1.lineWidth = 2;
              ctx_1.stroke();
              const teamLogo = new Image();
              teamLogo.src = rank.team.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx_1.drawImage(
                  teamLogo,
                  125,
                  575 - 25 * (teamLogo.height / teamLogo.width) + 95 * i,
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx_1.textBaseline = "middle";
              ctx_1.fillStyle = "#000";
              ctx_1.fillText(rank.team.name, 195, 580 + 95 * i);

              ctx_1.fillStyle = "#FFF";
              ctx_1.fillRect(600, 540 + 95 * i, 70, 70);
              ctx_1.fillStyle = "#CBA84E";
              ctx_1.strokeRect(600, 540 + 95 * i, 70, 70);
              ctx_1.lineWidth = 2;
              ctx_1.stroke();
              ctx_1.textBaseline = "middle";
              ctx_1.fillStyle = "#000";
              ctx_1.fillText(
                rank.w.toString(),
                635 - ctx_1.measureText(rank.w.toString()).width / 2,
                575 + 95 * i,
              );

              ctx_1.fillStyle = "#FFF";
              ctx_1.fillRect(700, 540 + 95 * i, 70, 70);
              ctx_1.fillStyle = "#CBA84E";
              ctx_1.strokeRect(700, 540 + 95 * i, 70, 70);
              ctx_1.lineWidth = 2;
              ctx_1.stroke();
              ctx_1.textBaseline = "middle";
              ctx_1.fillStyle = "#000";
              ctx_1.fillText(
                rank.d.toString(),
                735 - ctx_1.measureText(rank.d.toString()).width / 2,
                575 + 95 * i,
              );

              ctx_1.fillStyle = "#FFF";
              ctx_1.fillRect(800, 540 + 95 * i, 70, 70);
              ctx_1.fillStyle = "#CBA84E";
              ctx_1.strokeRect(800, 540 + 95 * i, 70, 70);
              ctx_1.lineWidth = 2;
              ctx_1.stroke();
              ctx_1.textBaseline = "middle";
              ctx_1.fillStyle = "#000";
              ctx_1.fillText(
                rank.t.toString(),
                835 - ctx_1.measureText(rank.t.toString()).width / 2,
                575 + 95 * i,
              );

              ctx_1.fillStyle = "#FFF";
              ctx_1.fillRect(900, 540 + 95 * i, 70, 70);
              ctx_1.fillStyle = "#CBA84E";
              ctx_1.strokeRect(900, 540 + 95 * i, 70, 70);
              ctx_1.lineWidth = 2;
              ctx_1.stroke();
              ctx_1.textBaseline = "middle";
              ctx_1.fillStyle = "#000";
              ctx_1.fillText(
                rank.p.toString(),
                935 - ctx_1.measureText(rank.p.toString()).width / 2,
                575 + 95 * i,
              );
            } else {
              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(100, 540 + 95 * (i - 7), 450, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(100, 540 + 95 * (i - 7), 450, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              const teamLogo = new Image();
              teamLogo.src = rank.team.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx_2.drawImage(
                  teamLogo,
                  125,
                  575 - 25 * (teamLogo.height / teamLogo.width) + 95 * (i - 7),
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(rank.team.name, 195, 580 + 95 * (i - 7));

              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(600, 540 + 95 * (i - 7), 70, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(600, 540 + 95 * (i - 7), 70, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(
                rank.w.toString(),
                635 - ctx_2.measureText(rank.w.toString()).width / 2,
                575 + 95 * (i - 7),
              );

              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(700, 540 + 95 * (i - 7), 70, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(700, 540 + 95 * (i - 7), 70, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(
                rank.d.toString(),
                735 - ctx_2.measureText(rank.d.toString()).width / 2,
                575 + 95 * (i - 7),
              );

              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(800, 540 + 95 * (i - 7), 70, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(800, 540 + 95 * (i - 7), 70, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(
                rank.t.toString(),
                835 - ctx_2.measureText(rank.t.toString()).width / 2,
                575 + 95 * (i - 7),
              );

              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(900, 540 + 95 * (i - 7), 70, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(900, 540 + 95 * (i - 7), 70, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(
                rank.p.toString(),
                935 - ctx_2.measureText(rank.p.toString()).width / 2,
                575 + 95 * (i - 7),
              );
            }
          });
        });
      };
    };
  }, [ranking]);

  const onDownload = () => {
    const canvas_1 = canvas_ref_1.current;
    const canvas_2 = canvas_ref_2.current;

    if (canvas_1) {
      download(
        canvas_1.toDataURL("image/jpeg", 1.0),
        "classifica_1.jpg",
        "image/jpeg",
      );
    }

    if (canvas_2) {
      download(
        canvas_2.toDataURL("image/jpeg", 1.0),
        "classifica_2.jpg",
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
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <canvas
              ref={canvas_ref_1}
              width={"1080px"}
              height={"1350px"}
              className="aspect-[4/5] max-w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <canvas
              ref={canvas_ref_2}
              width={"1080px"}
              height={"1350px"}
              className="aspect-[4/5] max-w-full"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
