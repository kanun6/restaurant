"use client";

import { useState } from "react";
import { reserveTable, cancelReservation } from "@/actions/actions";
import { useRouter } from "next/navigation";

const ReserveTableButton = ({ tableId, isReserved }: { tableId: string; isReserved: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReservation = async () => {
    console.log("🟢 กำลังจองโต๊ะ ID:", tableId); // ✅ ตรวจสอบว่า tableId ถูกต้อง
    if (!tableId) {
      alert("เกิดข้อผิดพลาด: ไม่พบหมายเลขโต๊ะ");
      return;
    }

    setLoading(true);
    const response = isReserved ? await cancelReservation(tableId) : await reserveTable(tableId);
    setLoading(false);

    if (response.success) {
      router.refresh();
    } else {
      alert(response.error);
    }
  };

  return (
    <button
      onClick={handleReservation}
      disabled={loading}
      className={`w-full py-2 rounded-lg font-semibold transition ${
        isReserved ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {loading ? "กำลังโหลด..." : isReserved ? "ยกเลิกการจอง" : "จองโต๊ะ"}
    </button>
  );
};

export default ReserveTableButton;
