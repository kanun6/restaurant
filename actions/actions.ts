"use server";

import { profileSchema, ValidateEithZode } from "@/utils/schemas";


const renderError = (error: unknown):{ message :string} => {
    return {
        message: error instanceof Error ? error.message : 'An Error!!!'
    }

};

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
    console.log(error);
    return renderError(error) 
  }
};
