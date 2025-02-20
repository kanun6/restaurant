"use client";

import { useEffect, useState } from "react";
import { fetchReservationsUser, cancelReservation } from "@/actions/actions";

interface Reservation {
  id: string;
  tableNumber: string;
  seatingCapacity: number;
  reservedAt: string; // ใช้ string
}

export default function ReservedTables() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadReservations() {
      const response = await fetchReservationsUser();
      if (response.success && response.data) { // ตรวจสอบว่ามีข้อมูลก่อนใช้งาน
        setReservations(response.data.map((table) => ({
          ...table,
          reservedAt: table.reservedAt ? new Date(table.reservedAt).toISOString() : "", // แปลง Date | null เป็น string
        })));
      } else {
        alert(`เกิดข้อผิดพลาด: ${response.error}`);
      }
    }
    loadReservations();
  }, []);

  // ฟังก์ชันยกเลิกการจองโต๊ะ
  const handleCancelReservation = async (tableId: string) => {
    if (!confirm("คุณต้องการยกเลิกการจองโต๊ะนี้ใช่หรือไม่?")) return;

    setLoading(tableId);
    const response = await cancelReservation(tableId);
    setLoading(null);

    if (response.success) {
      setReservations((prev) => prev.filter((table) => table.id !== tableId));
    } else {
      alert(`ไม่สามารถยกเลิกการจองได้: ${response.error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        โต๊ะที่คุณจองไว้
      </h2>

      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservations.map((table) => (
            <div key={table.id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold text-blue-600">
                โต๊ะหมายเลข {table.tableNumber}
              </h3>
              <p className="text-gray-700">ที่นั่ง: {table.seatingCapacity}</p>
              <p className="text-gray-500">
                จองเมื่อ: {table.reservedAt ? new Date(table.reservedAt).toLocaleString() : "N/A"}
              </p>
              <button
                onClick={() => handleCancelReservation(table.id)}
                className={`mt-4 px-4 py-2 text-white font-semibold rounded-md transition ${
                  loading === table.id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={loading === table.id}
              >
                {loading === table.id ? "กำลังยกเลิก..." : "ยกเลิกการจอง"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">คุณยังไม่ได้จองโต๊ะ</p>
      )}
    </div>
  );
}
