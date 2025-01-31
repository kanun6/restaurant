"use server";

import { profileSchema, ValidateEithZode } from "@/utils/schemas";


export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validateField = ValidateEithZode(profileSchema, rawData);
    console.log("validated", validateField);
    return { message: "Create Profile Success!!!" };

  } catch (error) {
    console.log(error)
    return { message: error.message  || 'An error server' }  
  }
};
