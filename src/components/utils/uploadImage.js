import { supabase } from "../../config/supabase";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data: url } = supabase.storage
    .from("blog-images")
    .getPublicUrl(fileName);

  return url.publicUrl;
};