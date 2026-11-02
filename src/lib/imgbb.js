
export const hasImgbbKey = Boolean(process.env.NEXT_PUBLIC_IMGBB_KEY);

export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Missing imgbb key");

  const body = new FormData();
  body.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body,
  });

  if (!response.ok) throw new Error("Image upload failed");

  const result = await response.json();
  return result.data.display_url;
}