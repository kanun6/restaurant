import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { logUserActivity } from "@/actions/actions"; // ✅ เรียกใช้ Action

// ✅ ป้องกัน PrismaClient ซ้ำซ้อน
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export async function GET() {
  try {
    console.log("🔍 Fetching profile stats...");

    // ✅ เรียก `logUserActivity()` และเช็คผลลัพธ์
    const logResult = await logUserActivity();
    console.log("🔄 logUserActivity result:", logResult);

    if (logResult?.error) {
      console.warn("⚠️ logUserActivity error:", logResult.error);
    }

    // ✅ นับจำนวนผู้ใช้ทั้งหมด
    const totalProfiles = await db.profile.count();

    // ✅ นับจำนวนผู้ใช้ที่สมัครใหม่ใน 7 วันล่าสุด
    const newProfilesLast7Days = await db.profile.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    // ✅ นับจำนวนผู้ใช้ที่เข้าใช้งานใน 7 วันล่าสุด
    const activeUsersLast7Days = await db.userActivity.count({
      where: {
        loginAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });

    console.log("📊 Profile stats:", {
      totalProfiles,
      newProfilesLast7Days,
      activeUsersLast7Days,
    });

    return NextResponse.json({
      totalProfiles,
      newProfilesLast7Days,
      activeUsersLast7Days,
    });
  } catch (error) {
    console.error("❌ Error fetching profile stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
