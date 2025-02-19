"use server";

import {
  foodSchema,
  imageSchema,
  profileSchema,
  ValidateEithZode,
} from "@/utils/schemas";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
// import { PrismaClient } from "@prisma/client";

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

    // return { message: "Create Profile Success!!!" };
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

    // ✅ ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id }, // ใช้ clerkId เชื่อมโยงกับ profileId
      select: { id: true }
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อนเพิ่มอาหาร");
    }

    // ✅ ดึงข้อมูลจากฟอร์ม
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFile = ValidateEithZode(imageSchema, { image: file });
    const validateField = ValidateEithZode(foodSchema, rawData);

    // ✅ อัปโหลดรูปไปที่ Supabase
    const fullPath = await uploadFile(validatedFile.image);
    console.log("🟢 Uploaded image path:", fullPath);

    // ✅ เพิ่มอาหารลงฐานข้อมูลโดยใช้ `profile.id`
    await prisma.food.create({
      data: {
        name: validateField.name,
        price: validateField.price,
        description: validateField.description,
        image: fullPath,
        profileId: profile.id, // ✅ ใช้ `profile.id` ที่ดึงมาแทน user.id
      },
    });

    // return { message: "เพิ่มอาหารสำเร็จ!" };
  } catch (error) {
    console.error("🔴 Error in AddFoodAction:", error);
    return renderError(error);
  }
  redirect('/Dashboard/add_food')
};


export const DeleteFoodAction = async (
  foodId: string
): Promise<{ message: string }> => {
  try {
    await prisma.food.delete({
      where: { id: foodId },
    });
    return { message: "Delete Food Success!!!" };
  } catch (error) {
    console.error("Error deleting food:", error);
    return renderError(error);
  }
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

  // ✅ ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
  const profile = await prisma.profile.findUnique({
    where: { clerkId: user.id },
    select: { id: true },
  });

  if (!profile) {
    throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ");
  }

  const favorite = await prisma.favorite.findFirst({
    where: {
      foodId: foodId,
      profileId: profile.id, // ✅ ใช้ `profile.id` จากฐานข้อมูล
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
  try {
    const user = await getAuthUser();

    // ✅ ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อน");
    }

    if (prevState.favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: prevState.favoriteId,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          foodId: prevState.foodId,
          profileId: profile.id, // ✅ ใช้ `profile.id` จากฐานข้อมูลแทน Clerk ID
        },
      });
    }

    revalidatePath(prevState.pathname);
    return {
      message: prevState.favoriteId ? "Remove Favorite Success" : "Add Favorite Success",
    };
  } catch (error) {
    console.error("🔴 Error in toggleFavoriteAction:", error);
    return renderError(error);
  }
};


export const fetchFavorite = async () => {
  try {
    const user = await getAuthUser();

    // ✅ ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อน");
    }

    // ✅ ดึงรายการ Favorite โดยใช้ `profile.id`
    const favorites = await prisma.favorite.findMany({
      where: {
        profileId: profile.id, // ✅ ใช้ `profile.id` จากฐานข้อมูลแทน `user.id`
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
  } catch (error) {
    console.error("🔴 Error in fetchFavorite:", error);
    return [];
  }
};


export const fetchFoodsdetail = async ({ id }: { id: string }) => {
  return prisma.food.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};

// ฟังก์ชันเพิ่มโต๊ะ
export async function addTable(tableNumber: string, seatingCapacity: number, availableDate: string) {
  try {
      const parsedDate = new Date(availableDate);

      if (!tableNumber || !seatingCapacity || isNaN(parsedDate.getTime())) {
          throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน');
      }

      const newTable = await prisma.table.create({
          data: { tableNumber, seatingCapacity, availableDate: parsedDate }
      });

      return { success: true, data: newTable };
  } catch (error: unknown) {
      if (error instanceof Error) {
          return { success: false, error: error.message };
      }
      return { success: false, error: 'เกิดข้อผิดพลาด ไม่สามารถเพิ่มโต๊ะได้' };
  }
}

// ฟังก์ชันลบโต๊ะ
export async function deleteTable(tableId: string) {
    try {
        const deletedTable = await prisma.table.delete({
            where: { id: tableId }
        });

        return { success: true, data: deletedTable };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'An unknown error occurred' };
    }
}

// ✅ ดึงรายการโต๊ะทั้งหมด
export async function getTables() {
  try {
      const tables = await prisma.table.findMany();
      return { success: true, data: tables };
  } catch (error: unknown) {
      if (error instanceof Error) {
          return { success: false, error: error.message };
      }
      return { success: false, error: 'An unknown error occurred' };
  }
}

export const fetchFavoriteStats = async () => {
  try {
    const favoriteStats = await prisma.favorite.groupBy({
      by: ["foodId"],
      _count: { foodId: true },
      orderBy: { _count: { foodId: "desc" } },
    });

    // ดึงชื่ออาหารที่เกี่ยวข้อง
    const foodData = await prisma.food.findMany({
      where: {
        id: { in: favoriteStats.map((fav) => fav.foodId) }
      },
      select: {
        id: true,
        name: true
      }
    });

    // รวมข้อมูล
    const result = favoriteStats.map((fav) => ({
      foodName: foodData.find((food) => food.id === fav.foodId)?.name || "ไม่ทราบชื่อ",
      favoriteCount: fav._count.foodId
    }));

    return { success: true, data: result };
  } catch (error) {
    console.error("🔴 Error fetching favorite stats:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูล Favorite ได้" };
  }
};

export async function logUserActivity() {
  try {
    console.log("📌 Checking logged-in user...");

    const session = await auth(); // ✅ ใช้ await เพื่อดึงข้อมูล
    const userId = session.userId; // ✅ ดึง userId จาก session

    if (!userId) {
      console.log("❌ User not logged in.");
      return { error: "Unauthorized" };
    }

    console.log("✅ Logged-in userId:", userId);

    // ✅ ค้นหา Profile จาก Clerk userId
    const profile = await prisma.profile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) {
      console.log("❌ Profile not found for userId:", userId);
      return { error: "Profile not found" };
    }

    console.log("✅ Profile found:", profile.id, "for user:", userId);

    // ✅ เช็คว่ามี log วันนี้แล้วหรือยัง
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.userActivity.findFirst({
      where: {
        profileId: profile.id,
        loginAt: {
          gte: today, // ✅ ดึง log เฉพาะของวันนี้
        },
      },
    });

    if (existingLog) {
      console.log("🔄 User already logged today. Skipping...");
      return { message: "User already logged today" };
    }

    console.log("🆕 Logging new UserActivity...");
    await prisma.userActivity.create({
      data: {
        profileId: profile.id,
        loginAt: new Date(),
      },
    });

    console.log("✅ User activity logged successfully for user:", userId);
    return { message: "User activity logged successfully" };

  } catch (error) {
    console.error("❌ Error logging user activity:", error);
    return { error: "Internal Server Error" };
  }
}