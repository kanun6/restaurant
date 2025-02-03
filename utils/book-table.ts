import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, phone, date, time, guests, tableId } = req.body;

    try {
      // ตรวจสอบว่าโต๊ะยังว่างหรือไม่
      const table = await prisma.table.findUnique({
        where: { id: tableId },
      });

      if (!table || table.status !== "available") {
        return res.status(400).json({ message: "โต๊ะนี้ถูกจองไปแล้ว" });
      }

      // บันทึกข้อมูลการจองโต๊ะ
      const reservation = await prisma.reservation.create({
        data: {
          name,
          phone,
          date,
          time,
          guests,
          table: { connect: { id: tableId } },
        },
      });

      // อัปเดตสถานะโต๊ะเป็น "reserved"
      await prisma.table.update({
        where: { id: tableId },
        data: { status: "reserved" },
      });

      res.status(200).json({ message: "จองโต๊ะสำเร็จ!", reservation });
    } catch (error) {
      res.status(500).json({ error: "เกิดข้อผิดพลาดในการจองโต๊ะ" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
