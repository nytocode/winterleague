import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const values = await req.json();

    const { team } = values;

    if (!team) {
      return Response.json({ message: "Invalid Fields" }, { status: 500 });
    }

    await db.goal.createMany({
      data: [
        {
          match_id: id,
          team_id: team,
        },
        {
          match_id: id,
          team_id: team,
        },
        {
          match_id: id,
          team_id: team,
        },
      ],
    });

    await db.match.update({
      where: {
        id,
      },
      data: {
        played: true,
      },
    });

    return Response.json({ message: "Match updated!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
