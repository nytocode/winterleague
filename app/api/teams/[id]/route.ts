import { db } from "@/lib/db";
import { uploadFile } from "@/lib/supabase/file";
import { TeamFormSchema } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

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

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } },
) {
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

    await db.team.update({
      where: {
        id,
      },
      data: {
        name,
        logo: picture,
      },
    });

    return Response.json({ message: "Team updated!" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
