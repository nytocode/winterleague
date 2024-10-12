import { db } from "@/lib/db";
import { GoalFormSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const values = await req.json();

    const validatedFields = await GoalFormSchema.safeParseAsync(values);

    if (!validatedFields.success) {
      return Response.json({ message: "Invalid fields" }, { status: 500 });
    }

    const { player, match } = validatedFields.data;

    await db.goal.create({
      data: {
        player_id: player,
        match_id: match,
      },
    });

    return Response.json({ message: "Goal created!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
