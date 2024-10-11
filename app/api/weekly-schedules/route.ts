import { db } from "@/lib/db";
import { WeeklyScheduleFormSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";
import { Round } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const values = await req.json();

    const validatedFields = WeeklyScheduleFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return Response.json({ message: "Invalid fields!" }, { status: 500 });
    }

    const { matches } = validatedFields.data;

    const schedule = await db.schedule.findFirst();

    await db.weeklySchedule.create({
      data: {
        schedule_id: schedule?.id,
        matches: {
          create: [
            ...matches.map((match) => ({
              teams: {
                connect: [{ id: match.home }, { id: match.away }],
              },
              round: Round.First,
            })),
            ...matches.map((match) => ({
              teams: {
                connect: [{ id: match.away }, { id: match.home }].reverse(),
              },
              round: Round.Second,
            })),
          ],
        },
      },
    });

    revalidatePath("/schedules");

    return Response.json({ message: "Schedule created!" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
