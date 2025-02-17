import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // เวลาปัจจุบันลบ 5 นาที
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // นับจำนวนผู้ใช้ที่มี `updatedAt` อยู่ภายใน 5 นาทีล่าสุด
    const activeUsers = await prisma.userActivity.count({
      where: {
        updatedAt: {
          gte: fiveMinutesAgo, // ค้นหาผู้ใช้ที่อัปเดตล่าสุดในช่วง 5 นาที
        },
      },
    });

    return NextResponse.json({ activeUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching active users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
