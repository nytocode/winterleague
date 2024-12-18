import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const values = await req.json();

    const validatedFields = z
      .object({
        played: z.boolean(),
      })
      .safeParse(values);

    if (!validatedFields.success) {
      return Response.json({ message: "Invalid fields!" }, { status: 500 });
    }

    const { played } = validatedFields.data;

    if (!played) {
      await db.goal.deleteMany({
        where: {
          AND: [
            {
              match_id: id,
            },
            {
              player_id: undefined,
            },
          ],
        },
      });
    }

    await db.match.update({
      where: { id },
      data: {
        played,
      },
    });

    return Response.json({ message: "Match updated!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
