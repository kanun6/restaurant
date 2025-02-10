import { z, ZodSchema } from "zod";

// const profileSchema = z.string().min(2,{message:"อักษรต้องมีอย่างน้อย 2 ตัวขึ้นไป"})

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "firstName อักษรต้องมีอย่างน้อย 2 ตัวขึ้นไป" }),
  lastName: z
    .string()
    .min(2, { message: "lastName อักษรต้องมีอย่างน้อย 2 ตัวขึ้นไป" }),
  userName: z
    .string()
    .min(2, { message: "userName อักษรต้องมีอย่างน้อย 2 ตัวขึ้นไป" }),
});

const validatedImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((File) => {
    return File.size <= maxFileSize;
  }, "File size must be less than 1MB");
};

export const imageSchema = z.object({
  image: validatedImage(),
});

export const foodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวขึ้นไป" })
    .max(30, { message: "ชื่อต้องน้อยกว่า 30 ตัว" }),
  description: z
    .string()
    .min(2, { message: "รายละเอียดต้องมากกว่า 2 ตัวขึ้นไป" })
    .max(200, { message: "รายละเอียดต้องน้อยกว่า 30 ตัว" }),
  price: z.coerce.number().int().min(0, { message: "ราคาต้องมากกว่า 0" }),
});

export const ValidateEithZode = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
