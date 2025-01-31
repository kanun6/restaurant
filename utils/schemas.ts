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




export const ValidateEithZode = <T>(
    schema: ZodSchema<T>, 
    data: unknown):T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
