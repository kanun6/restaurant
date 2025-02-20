import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logUserActivity } from "@/actions/actions";

export async function GET() {
  try {
    console.log("🔍 Fetching profile stats...");

    // เรียก `logUserActivity()` และเช็คผลลัพธ์
    const logResult = await logUserActivity();
    console.log("🔄 logUserActivity result:", logResult);

    if (logResult?.error) {
      console.warn("logUserActivity error:", logResult.error);
      return NextResponse.json({ error: logResult.error }, { status: 401 }); // คืน 401 ถ้าไม่ได้ล็อกอิน
    }

    // ตั้งค่าช่วงเวลา 7 วันล่าสุด
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // นับจำนวนผู้ใช้ทั้งหมด
    const totalProfiles = await prisma.profile.count();

    // นับจำนวนผู้ใช้ที่สมัครใหม่ใน 7 วันล่าสุด
    const newProfilesLast7Days = await prisma.profile.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    });

    // นับจำนวนผู้ใช้ที่เข้าใช้งานใน 7 วันล่าสุด
    const activeUsersLast7Days = await prisma.userActivity.count({
      where: { loginAt: { gte: sevenDaysAgo } },
    });

    console.log("Profile stats:", {
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
