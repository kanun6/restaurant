"use server";

import {
  foodSchema,
  imageSchema,
  profileSchema,
  ValidateEithZode,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
// import { date } from "zod";
// import { profile } from "console";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged!!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An Error!!!",
  };
};

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login");

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
      },
    });
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    return { message: "Create Profile Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const AddFoodAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFile = ValidateEithZode(imageSchema, { image: file });
    const validateField = ValidateEithZode(foodSchema, rawData);
    // console.log("validated", validatedFile);
    // console.log("validated", validateField);

    const fullPath = await uploadFile(validatedFile.image);
    console.log(fullPath);
    await prisma.food.create({
      data: {
        name: validateField.name,
        price: validateField.price,
        description: validateField.description,
        image: fullPath,
        profileId: user.id,
      },
    });
    // return { message: "Add Food Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  redirect("/");
};

export const fetchFoods = async ({ search = "" }: { search?: string }) => {
  const foods = await prisma.food.findMany({
    where: {
      OR: [{ name: { contains: search } }, {}],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return foods;
};

export const fetchFavoriteId = async ({ foodId }: { foodId: string }) => {
  const user = await getAuthUser();
  const favorite = await prisma.favorite.findFirst({
    where: {
      foodId: foodId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  foodId: string;
  pathname: string;
}) => {
  const { favoriteId, foodId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          foodId: foodId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Remove Favorite Success" : "Add  Favorite Success",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorite = async () => {
  const user = await getAuthUser();
  const favorites = await prisma.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      food: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.food);
};

export const fetchFoodsdetail = async ({id}:{id:string})=>{
  return prisma.food.findFirst({
    where:{
      id
    },
    include:{
      profile:true
    }
  })

}