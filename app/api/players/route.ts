import { db } from "@/lib/db";
import { uploadFile } from "@/lib/supabase/file";
import { PlayerFormSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const formData = await req.formData();
    const values: Record<string, string | File> = {};
    formData.forEach((val: string | File, key: string) => {
      values[key] = val;
    });

    const validatedFields = await PlayerFormSchema.safeParseAsync(values);

    if (!validatedFields.success) {
      return Response.json({ message: "Invalid fields" }, { status: 500 });
    }

    const { first_name, last_name, team, image } = validatedFields.data;

    let picture;

    if (image !== undefined) {
      const file_name = `${nanoid()}.${image?.name?.split(".")[1]}`;

      picture = await uploadFile("images", `players/${file_name}`, image);
    }

    await db.player.create({
      data: {
        first_name,
        last_name,
        image: picture,
        team_id: team,
      },
    });

    return Response.json({ message: "Player created!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
