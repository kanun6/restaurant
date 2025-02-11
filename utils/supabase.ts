import { createClient } from "@supabase/supabase-js";

const bucket = "food-bucket";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStamp = Date.now();

  // แปลงชื่อไฟล์ให้ปลอดภัย: ลบช่องว่างและอักขระพิเศษ
  const sanitizedFileName = image.name
    .replace(/\s+/g, "-") // แทนที่ช่องว่างด้วย '-'
    .replace(/[^a-zA-Z0-9.-]/g, ""); // ลบอักขระพิเศษ ยกเว้นตัวอักษร, ตัวเลข, จุด, และขีดกลาง

  const newName = `food-${timeStamp}-${sanitizedFileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image,{
      cacheControl:'3600'
    });

  if (error) {
    console.error("Upload Error:", error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
  // const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')

  // console.log(data.publicUrl)

  return supabase.storage
  .from(bucket)
  .getPublicUrl(newName).data.publicUrl;
}
