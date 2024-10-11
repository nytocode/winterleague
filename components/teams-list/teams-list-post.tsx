"use client";

import { Team } from "@prisma/client";
import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import download from "downloadjs";

interface Props {
  teams: Team[];
}

export const TeamsListPost = ({ teams }: Props) => {
  const canvas_ref_1 = useRef<HTMLCanvasElement>(null);
  const canvas_ref_2 = useRef<HTMLCanvasElement>(null);
  const canvas_ref_3 = useRef<HTMLCanvasElement>(null);

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

    // CANVAS #3
    const canvas_3 = canvas_ref_3.current;
    if (!canvas_3) return;
    const ctx_3 = canvas_3.getContext("2d");
    if (!ctx_3) return;

    const width = canvas_1.width;
    const height = canvas_1.height;

    const bg = new Image();
    bg.src = "/images/base-post.jpg";
    bg.crossOrigin = "anonymous";
    bg.onload = () => {
      ctx_1.drawImage(bg, 0, 0);
      ctx_2.drawImage(bg, 0, 0);
      ctx_3.drawImage(bg, 0, 0);

      const logo = new Image();
      logo.src = "/images/logo.png";
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        ctx_1.drawImage(logo, width / 2 - 125, height / 2 - 270, 250, 250);
        ctx_2.drawImage(logo, width / 2 - 85, 20, 170, 170);
        ctx_3.drawImage(logo, width / 2 - 85, 20, 170, 170);

        const font = new FontFace(
          "Righteous",
          "url(/fonts/Righteous-Regular.ttf)",
        );
        font.load().then((f) => {
          document.fonts.add(f);
          ctx_1.font = "64px Righteous";
          ctx_2.font = "64px Righteous";
          ctx_3.font = "64px Righteous";
          ctx_1.textBaseline = "top";
          ctx_2.textBaseline = "top";
          ctx_3.textBaseline = "top";
          ctx_1.fillStyle = "#CBA84E";
          ctx_2.fillStyle = "#CBA84E";
          ctx_3.fillStyle = "#CBA84E";
          ctx_1.fillText(
            "WINTER LEAGUE",
            width / 2 - ctx_1.measureText("WINTER LEAGUE").width / 2,
            height / 2,
          );
          ctx_2.fillText(
            "WINTER LEAGUE",
            width / 2 - ctx_2.measureText("WINTER LEAGUE").width / 2,
            200,
          );
          ctx_3.fillText(
            "WINTER LEAGUE",
            width / 2 - ctx_3.measureText("WINTER LEAGUE").width / 2,
            200,
          );

          ctx_1.beginPath();
          ctx_1.moveTo(width / 2 - 170, height / 2 + 90);
          ctx_1.lineTo(width / 2 + 170, height / 2 + 90);
          ctx_1.lineWidth = 2;
          ctx_1.strokeStyle = "#CBA84E";
          ctx_1.stroke();

          ctx_2.beginPath();
          ctx_2.moveTo(width / 2 - 170, 270);
          ctx_2.lineTo(width / 2 + 170, 270);
          ctx_2.lineWidth = 2;
          ctx_2.strokeStyle = "#CBA84E";
          ctx_2.stroke();

          ctx_3.beginPath();
          ctx_3.moveTo(width / 2 - 170, 270);
          ctx_3.lineTo(width / 2 + 170, 270);
          ctx_3.lineWidth = 2;
          ctx_3.strokeStyle = "#CBA84E";
          ctx_3.stroke();

          ctx_1.font = "32px Righteous";
          ctx_2.font = "32px Righteous";
          ctx_3.font = "32px Righteous";
          ctx_1.fillText(
            "2024/2025",
            width / 2 - ctx_1.measureText("2024/2025").width / 2,
            height / 2 + 110,
          );
          ctx_2.fillText(
            "2024/2025",
            width / 2 - ctx_2.measureText("2024/2025").width / 2,
            290,
          );
          ctx_3.fillText(
            "2024/2025",
            width / 2 - ctx_3.measureText("2024/2025").width / 2,
            290,
          );
          ctx_1.font = "48px Righteous";
          ctx_1.fillText(
            "SQUADRE",
            width / 2 - ctx_1.measureText("SQUADRE").width / 2,
            height / 2 + 170,
          );

          teams.forEach((team, i) => {
            if (i < 7) {
              ctx_2.fillStyle = "#FFF";
              ctx_2.fillRect(width / 2 - 250, 360 + 95 * i, 500, 70);
              ctx_2.fillStyle = "#CBA84E";
              ctx_2.strokeRect(width / 2 - 250, 360 + 95 * i, 500, 70);
              ctx_2.lineWidth = 2;
              ctx_2.stroke();
              const teamLogo = new Image();
              teamLogo.src = team.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx_2.drawImage(
                  teamLogo,
                  width / 2 - 225,
                  395 - 25 * (teamLogo.height / teamLogo.width) + 95 * i,
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx_2.textBaseline = "middle";
              ctx_2.fillStyle = "#000";
              ctx_2.fillText(team.name, width / 2 - 155, 400 + 95 * i);
            } else {
              ctx_3.fillStyle = "#FFF";
              ctx_3.fillRect(width / 2 - 250, 360 + 95 * (i - 7), 500, 70);
              ctx_3.fillStyle = "#CBA84E";
              ctx_3.strokeRect(width / 2 - 250, 360 + 95 * (i - 7), 500, 70);
              ctx_3.lineWidth = 2;
              ctx_3.stroke();
              const teamLogo = new Image();
              teamLogo.src = team.logo;
              teamLogo.crossOrigin = "anonymous";
              teamLogo.onload = () => {
                ctx_3.drawImage(
                  teamLogo,
                  width / 2 - 225,
                  395 - 25 * (teamLogo.height / teamLogo.width) + 95 * (i - 7),
                  50,
                  50 * (teamLogo.height / teamLogo.width),
                );
              };

              ctx_3.textBaseline = "middle";
              ctx_3.fillStyle = "#000";
              ctx_3.fillText(team.name, width / 2 - 155, 400 + 95 * (i - 7));
            }
          });
        });
      };
    };
  }, [teams]);

  const onDownload = () => {
    const canvas_1 = canvas_ref_1.current;
    const canvas_2 = canvas_ref_2.current;
    const canvas_3 = canvas_ref_3.current;

    if (canvas_1) {
      download(
        canvas_1.toDataURL("image/jpeg", 1.0),
        "lista-squadre_1.jpg",
        "image/jpeg",
      );
    }

    if (canvas_2) {
      download(
        canvas_2.toDataURL("image/jpeg", 1.0),
        "lista-squadre_2.jpg",
        "image/jpeg",
      );
    }

    if (canvas_3) {
      download(
        canvas_3.toDataURL("image/jpeg", 1.0),
        "lista-squadre_3.jpg",
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
              height={"1080px"}
              className="aspect-square max-w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <canvas
              ref={canvas_ref_2}
              width={"1080px"}
              height={"1080px"}
              className="aspect-square max-w-full"
            />
          </CarouselItem>
          <CarouselItem>
            <canvas
              ref={canvas_ref_3}
              width={"1080px"}
              height={"1080px"}
              className="aspect-square max-w-full"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
