"use server";

import { foodSchema, imageSchema, profileSchema, ValidateEithZode } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {prisma} from '@/lib/prisma'
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";

const getAuthUser = async ()=>{
  const user = await currentUser()
  if(!user){
    throw new Error('You must logged!!!')
  }
  if(!user.privateMetadata.hasProfile) redirect('/profile/create')
  return user
}


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
    const user = await currentUser()
    if(!user) throw new Error('Please Login')

    const rawData = Object.fromEntries(formData);
    const validateField = ValidateEithZode(profileSchema, rawData);
    // console.log("validated", validateField);

     await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        firstName: validateField.firstName,
        lastName: validateField.lastName,
        username: validateField.userName, 
      }
     })
     const client = await clerkClient()
     await client.users.updateUserMetadata(user.id,{
      privateMetadata:{
        hasProfile: true
      }
     })

    return { message: "Create Profile Success!!!" };

  } catch (error) {
    // console.log(error);
    return renderError(error) 
  }
  redirect('/')
};


export const AddFoodAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{message: string}> => {
  try {
    const user = await getAuthUser()
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File
    

    const validatedFile = ValidateEithZode(imageSchema, {image:file})
    const validateField = ValidateEithZode(foodSchema, rawData);
    // console.log("validated", validatedFile);
    // console.log("validated", validateField);

    const fullPath = await uploadFile(validatedFile.image)
    console.log(fullPath)

    




    

    return { message: "Add Food Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error) 
  }
  // redirect('/')
};

