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


export const createRestaurantAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    // ✅ ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
    const user = await currentUser();
    if (!user) throw new Error("Please login");

    // ✅ ดึงค่าจาก FormData
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const contact = formData.get("contact") as string;

    if (!name || !location || !contact) {
      throw new Error("All fields are required");
    }

    // ✅ บันทึกข้อมูลร้านอาหารลงในฐานข้อมูล
    await prisma.restaurant.create({
      data: {
        name,
        location,
        contact,
      },
    });

    console.log("Restaurant created successfully:", { name, location, contact });

    return { message: "Create Restaurant Success!!!" };
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return { message: error instanceof Error ? error.message : "An error occurred" };
  }
};

export const fetchFoods = async()=>{
  const food = await db.food.findMany({
    orderBy:{
      createdAT: 'desc'
    }
  })
  return food
}