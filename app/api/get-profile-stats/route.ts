import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // นับจำนวนผู้ใช้ทั้งหมด
    const totalProfiles = await prisma.profile.count();

    // นับจำนวนผู้ใช้ที่สมัครใหม่ใน 7 วันล่าสุด
    const newProfilesLast7Days = await prisma.profile.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    // นับจำนวนผู้ใช้ที่เข้าใช้งานใน 7 วันล่าสุด
    const activeUsersLast7Days = await prisma.userActivity.count({
      where: {
        loginAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    return NextResponse.json({
      totalProfiles,
      newProfilesLast7Days,
      activeUsersLast7Days,
    });
  } catch (error) {
    console.error("Error fetching profile stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
