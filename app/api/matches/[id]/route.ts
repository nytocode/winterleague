import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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

    await db.match.update({
      where: { id },
      data: {
        played: values?.played ?? false,
      },
    });

    return Response.json({ message: "Match updated!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
