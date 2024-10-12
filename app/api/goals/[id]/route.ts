import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    await db.goal.delete({
      where: {
        id,
      },
    });

    return Response.json({ message: "Goal deleted!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
