import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📌 Request Body:", body);

    if (!body.profileId) {
      console.log("❌ Missing profileId");
      return NextResponse.json({ error: "Missing profileId" }, { status: 400 });
    }

    const profileId = body.profileId;
    console.log("🔎 Checking profileId in Profile table:", profileId);

    // ✅ ตรวจสอบว่า profileId มีอยู่ใน Profile หรือไม่
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      console.log("❌ Profile not found:", profileId);
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    console.log("✅ Profile exists, proceeding to update UserActivity");

    // ✅ ตรวจสอบว่ามี UserActivity หรือยัง
    const existingActivity = await prisma.userActivity.findFirst({
      where: { profileId },
    });

    if (existingActivity) {
      console.log("🔄 Updating existing activity...");
      await prisma.userActivity.update({
        where: { id: existingActivity.id },
        data: { updatedAt: new Date() },
      });
    } else {
      console.log("🆕 Creating new UserActivity record...");
      await prisma.userActivity.create({
        data: {
          profileId,
          loginAt: new Date(),
        },
      });
    }

    console.log("✅ User activity logged successfully");
    return NextResponse.json({ message: "User activity logged successfully" }, { status: 200 });

  } catch (error) {
    console.error("❌ Error logging user activity:", error);
  
    // ✅ ตรวจสอบว่า error เป็น instance ของ Error หรือไม่
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}  