import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const team = await db.team.findUnique({
      where: {
        id,
      },
    });

    return Response.json({ team }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
