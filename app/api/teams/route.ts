import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { TeamFormSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";
import { uploadFile } from "@/lib/supabase/file";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const teams = await db.team.findMany();

    return Response.json({ teams }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

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

    const validatedFields = await TeamFormSchema.safeParseAsync(values);

    if (!validatedFields.success) {
      return Response.json({ message: "Invalid fields" }, { status: 500 });
    }

    const { name, logo } = validatedFields.data;

    const file_name = `${nanoid()}.${logo.name.split(".")[1]}`;

    const picture = await uploadFile("images", `logos/${file_name}`, logo);

    if (!picture) {
      return Response.json({ message: "Invalid logo!" }, { status: 405 });
    }

    await db.team.create({
      data: {
        name,
        logo: picture,
      },
    });

    return Response.json({ message: "Team created!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
