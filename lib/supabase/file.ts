import { createClient } from "./client";

export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error || !data) {
      console.log(error);
      return null;
    }

    return getFilePublicUrl(bucket, path);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getFilePublicUrl(bucket: string, path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}
