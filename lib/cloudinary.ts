export async function uploadToCloudinary(
  file: File,
  briefId: string,
  folder: "logo" | "photos" | "documents"
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);
  formData.append("folder", `client-brief/${briefId}/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Error al subir el archivo");

  const data = await res.json();
  return data.secure_url as string;
}
