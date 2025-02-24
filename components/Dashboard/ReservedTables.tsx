"use client";

import { useState, useEffect } from "react";
import { fetchReservedTables } from "@/actions/actions";

interface Table {
  id: string;
  tableNumber: string;
  seatingCapacity: number;
  availableDate: string;
  reservedAt: string;
  profile?: { username: string; email: string }; 
}

export default function ReservedTables() {
  const [reservedTables, setReservedTables] = useState<Table[]>([]);

  useEffect(() => {
    async function loadReservedTables() {
      const response = await fetchReservedTables();
      if (response.success) {
        setReservedTables(response.data);
      } else {
        alert(`เกิดข้อผิดพลาด: ${response.error}`);
      }
    }
    loadReservedTables();
  }, []);

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🛑 โต๊ะที่ถูกจอง</h2>
      {reservedTables.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">หมายเลขโต๊ะ</th>
              <th className="border p-2">จำนวนที่นั่ง</th>
              <th className="border p-2">วันที่จอง</th>
              <th className="border p-2">ผู้จอง</th>
              <th className="border p-2">อีเมล</th>
            </tr>
          </thead>
          <tbody>
            {reservedTables.map((table) => (
              <tr key={table.id} className="text-center">
                <td className="border p-2">{table.tableNumber}</td>
                <td className="border p-2">{table.seatingCapacity}</td>
                <td className="border p-2">{new Date(table.reservedAt).toLocaleDateString()}</td>
                <td className="border p-2 font-semibold text-blue-600">
                  {table.profile?.username || "ไม่ทราบชื่อ"}
                </td>
                <td className="border p-2 text-gray-600">
                  {table.profile?.email || "ไม่ทราบอีเมล"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">❌ ไม่มีโต๊ะที่ถูกจอง</p>
      )}
    </div>
  );
}
