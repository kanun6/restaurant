"use server";

import { profileSchema, ValidateEithZode } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {prisma} from '@/lib/prisma'
import { redirect } from "next/navigation";

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
        username: validateField.userName, // ✅ ใช้ "userName" ตาม schema.prisma
      }
     })
     const client = await clerkClient()
     await client.users.updateUserMetadata(user.id,{
      privateMetadata:{
        hasProfile: true
      }
     })

    // return { message: "Create Profile Success!!!" };

  } catch (error) {
    // console.log(error);
    return renderError(error) 
  }
  redirect('/')
};
