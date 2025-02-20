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

    // ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id }, // ใช้ clerkId เชื่อมโยงกับ profileId
      select: { id: true }
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อนเพิ่มอาหาร");
    }

    // ดึงข้อมูลจากฟอร์ม
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFile = ValidateEithZode(imageSchema, { image: file });
    const validateField = ValidateEithZode(foodSchema, rawData);

    // อัปโหลดรูปไปที่ Supabase
    const fullPath = await uploadFile(validatedFile.image);
    console.log("🟢 Uploaded image path:", fullPath);

    // เพิ่มอาหารลงฐานข้อมูลโดยใช้ `profile.id`
    await prisma.food.create({
      data: {
        name: validateField.name,
        price: validateField.price,
        description: validateField.description,
        image: fullPath,
        profileId: profile.id, // ใช้ `profile.id` ที่ดึงมาแทน user.id
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

  // ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
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
      profileId: profile.id, // ใช้ `profile.id` จากฐานข้อมูล
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

    // ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
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
          profileId: profile.id, // ใช้ `profile.id` จากฐานข้อมูลแทน Clerk ID
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

    // ดึง `profileId` จากฐานข้อมูลโดยใช้ `clerkId`
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อน");
    }

    // ดึงรายการ Favorite โดยใช้ `profile.id`
    const favorites = await prisma.favorite.findMany({
      where: {
        profileId: profile.id, // ใช้ `profile.id` จากฐานข้อมูลแทน `user.id`
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

// ดึงรายการโต๊ะทั้งหมด
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

interface FavoriteStatsResponse {
  success: boolean;
  data?: { foodName: string; favoriteCount: number }[];
  error?: string;
}

export const fetchFavoriteStats = async (): Promise<FavoriteStatsResponse> => {
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
    console.log("Checking logged-in user...");

    // ใช้ getAuthUser() แทน auth()
    const user = await getAuthUser(); 
    const userId = user.id; // Clerk userId

    console.log("Logged-in userId:", userId);

    // ค้นหา Profile จาก Clerk userId
    const profile = await prisma.profile.findUnique({
      where: { clerkId: userId },
    });

    if (!profile) {
      console.log("Profile not found for userId:", userId);
      return { error: "Profile not found" };
    }

    console.log("Profile found:", profile.id, "for user:", userId);

    // เช็คว่ามี log วันนี้แล้วหรือยัง
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await prisma.userActivity.findFirst({
      where: {
        profileId: profile.id,
        loginAt: {
          gte: today, // ดึง log เฉพาะของวันนี้
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

    console.log("User activity logged successfully for user:", userId);
    return { message: "User activity logged successfully" };

  } catch (error) {
    console.error("Error logging user activity:", error);
    return { error: "Internal Server Error" };
  }
}

export async function reserveTable(tableId: string) {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("ไม่พบข้อมูลผู้ใช้ โปรดเข้าสู่ระบบ");

    console.log("🟢 User ID:", user.id); // Clerk ID
    console.log("🟢 Table ID:", tableId);

    // ดึง `profileId` จากฐานข้อมูล
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id }, // ใช้ Clerk ID เพื่อหา Profile ID
      select: { id: true }
    });

    if (!profile) throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดสร้างโปรไฟล์ก่อน");

    console.log("🟢 Profile ID:", profile.id); // แสดง `profileId`

    // ตรวจสอบว่าโต๊ะมีอยู่จริง
    const existingTable = await prisma.table.findUnique({
      where: { id: tableId },
      select: { reservedById: true }
    });

    console.log("🔵 ข้อมูลโต๊ะก่อนอัปเดต:", existingTable);

    if (!existingTable) throw new Error("ไม่พบโต๊ะนี้");
    if (existingTable.reservedById) throw new Error("โต๊ะนี้ถูกจองแล้ว");

    // ใช้ `profile.id` ในการอัปเดต
    const updatedTable = await prisma.table.update({
      where: { id: tableId },
      data: { reservedById: profile.id, reservedAt: new Date() }
    });

    console.log("จองโต๊ะสำเร็จ:", updatedTable);
    return { success: true, data: updatedTable };
  } catch (error) {
    console.error("🔴 Error reserving table:", error);
    return { success: false, error: error instanceof Error ? error.message : "ไม่สามารถจองโต๊ะได้" };
  }
}


// ฟังก์ชันยกเลิกการจอง
export async function cancelReservation(tableId: string) {
  try {
    const user = await getAuthUser();

    // ดึง `profileId` จากฐานข้อมูล
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id }, // ใช้ Clerk ID เพื่อหา Profile ID
      select: { id: true }
    });

    if (!profile) throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ โปรดเข้าสู่ระบบ");

    console.log("🟢 Profile ID:", profile.id);

    // ตรวจสอบว่า User เป็นเจ้าของการจองหรือไม่
    const table = await prisma.table.findUnique({
      where: { id: tableId },
      select: { reservedById: true }
    });

    console.log("🔵 ข้อมูลโต๊ะก่อนยกเลิก:", table);

    if (!table) throw new Error("ไม่พบโต๊ะนี้");
    if (table.reservedById !== profile.id) throw new Error("คุณไม่ได้จองโต๊ะนี้");

    // อัปเดตให้โต๊ะเป็นว่าง
    const updatedTable = await prisma.table.update({
      where: { id: tableId },
      data: { reservedById: null, reservedAt: null }
    });

    console.log("ยกเลิกการจองโต๊ะสำเร็จ:", updatedTable);
    
    revalidatePath("/user/tables"); // อัปเดตหน้า
    return { success: true, data: updatedTable };
  } catch (error) {
    console.error("🔴 Error canceling reservation:", error);
    return { success: false, error: error instanceof Error ? error.message : "ไม่สามารถยกเลิกการจองได้" };
  }
}

export async function fetchReservedTables() {
  try {
    // ดึงโต๊ะที่ถูกจอง พร้อมกับชื่อ username และ email ของผู้จอง
    const reservedTables = await prisma.table.findMany({
      where: { reservedById: { not: null } }, // ค้นหาเฉพาะโต๊ะที่ถูกจอง
      include: {
        profile: { select: { username: true, email: true } } // ดึง username และ email
      },
      orderBy: { reservedAt: "desc" } // เรียงจากล่าสุด
    });

    return { success: true, data: reservedTables };
  } catch (error) {
    console.error("🔴 Error fetching reserved tables:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลโต๊ะที่ถูกจองได้" };
  }
}

export async function fetchReservationsUser() {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("กรุณาเข้าสู่ระบบ");

    // ค้นหา Profile จาก Clerk ID
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile) throw new Error("ไม่พบโปรไฟล์ของคุณ");

    // ดึงโต๊ะที่ผู้ใช้จองไว้
    const reservations = await prisma.table.findMany({
      where: { reservedById: profile.id },
      select: {
        id: true,
        tableNumber: true,
        seatingCapacity: true,
        reservedAt: true,
      },
      orderBy: { reservedAt: "desc" },
    });

    return { success: true, data: reservations };
  } catch (error) {
    console.error("🔴 Error fetching user reservations:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลการจองโต๊ะได้" };
  }
}


export async function orderFood(foodId: string, quantity: number) {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("ไม่พบข้อมูลผู้ใช้ โปรดเข้าสู่ระบบ");

    // ดึงโปรไฟล์ของผู้ใช้
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile) {
      throw new Error("ไม่พบโปรไฟล์ของคุณในระบบ");
    }

    // ดึงข้อมูลอาหารที่สั่ง
    const food = await prisma.food.findUnique({
      where: { id: foodId },
      select: { price: true },
    });

    if (!food) {
      throw new Error("ไม่พบอาหารที่เลือก");
    }

    const totalPrice = food.price * quantity;

    // บันทึกคำสั่งซื้อ
    const newOrder = await prisma.order.create({
      data: {
        userId: profile.id,
        foodId,
        quantity,
        totalPrice,
      },
    });

    return { success: true, data: newOrder };
  } catch (error) {
    console.error("🔴 Error ordering food:", error);
    return { success: false, error: error instanceof Error ? error.message : "ไม่สามารถสั่งอาหารได้" };
  }
}



export async function cancelOrder(orderId: string) {
  try {
    const user = await getAuthUser(); // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
    if (!user) throw new Error("ไม่พบข้อมูลผู้ใช้ โปรดเข้าสู่ระบบ");

    // ค้นหาคำสั่งซื้อ
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { userId: true },
    });

    if (!order) {
      throw new Error("ไม่พบคำสั่งซื้อนี้");
    }

    // ตรวจสอบว่า ผู้ใช้เป็นเจ้าของคำสั่งซื้อนี้หรือไม่
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!profile || order.userId !== profile.id) {
      throw new Error("คุณไม่มีสิทธิ์ยกเลิกคำสั่งซื้อนี้");
    }

    // ลบคำสั่งซื้อจากฐานข้อมูล
    await prisma.order.delete({
      where: { id: orderId },
    });

    return { success: true, message: "ยกเลิกคำสั่งซื้อสำเร็จ" };
  } catch (error) {
    console.error("🔴 Error canceling order:", error);
    return { success: false, error: error instanceof Error ? error.message : "ไม่สามารถยกเลิกคำสั่งซื้อได้" };
  }
}



export async function fetchOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            username: true, // ดึง username
            table: { select: { tableNumber: true } }, // ดึง tableNumber แทน tableId
          },
        },
        food: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // แปลงข้อมูลให้ใช้งานง่าย
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      foodName: order.food.name,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      username: order.user?.username || "ไม่ทราบชื่อ",
      tableNumber: order.user?.table?.[0]?.tableNumber || "ไม่มีโต๊ะ",
      createdAt: order.createdAt,
    }));

    return { success: true, data: formattedOrders };
  } catch (error) {
    console.error("🔴 Error fetching orders:", error);
    return { success: false, error: "ไม่สามารถดึงข้อมูลออเดอร์ได้" };
  }
}

export async function fetchOrdersUser() {
  try {
    const user = await getAuthUser();
    if (!user) {
      console.error("🔴 Error: User is not logged in");
      return { success: false, error: "โปรดเข้าสู่ระบบ" };
    }

    console.log("🟢 Authenticated User ID:", user.id);

    // ค้นหา Profile ของผู้ใช้จาก Clerk ID
    const profile = await prisma.profile.findUnique({
      where: { clerkId: user.id },
      select: { id: true, username: true },
    });

    if (!profile) {
      console.error("🔴 Error: Profile not found for user:", user.id);
      return { success: false, error: "ไม่พบโปรไฟล์ของคุณ" };
    }

    console.log("🟢 Profile Found:", profile.id, "Username:", profile.username);

    // ดึงเฉพาะคำสั่งซื้อของผู้ใช้
    const orders = await prisma.order.findMany({
      where: { userId: profile.id }, // ใช้ userId ที่เชื่อมโยงกับ profile
      include: {
        food: { select: { name: true, price: true } }, // ดึงข้อมูลอาหาร
        user: {
          select: {
            username: true,
            table: { select: { tableNumber: true } }, // ดึง tableNumber แทน tableId
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log("🟢 Orders Retrieved:", orders.length);

    // แปลงข้อมูลให้ใช้งานง่าย
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      foodName: order.food?.name || "ไม่ทราบชื่อ", // ตรวจสอบ null safety
      quantity: order.quantity,
      totalPrice: order.quantity * (order.food?.price || 0), // ป้องกัน error null
      username: order.user?.username || "ไม่ทราบชื่อ", // เพิ่ม username
      tableNumber: order.user?.table?.length ? order.user.table[0].tableNumber : "ไม่มีโต๊ะ", // แก้ไขการดึง tableNumber
      createdAt: order.createdAt,
    }));
    
    return { success: true, data: formattedOrders };
  } catch (error) {
    console.error("🔴 Error fetching user orders:", error);
    return { success: false, error: "ไม่สามารถดึงคำสั่งซื้อได้" };
  }
}
