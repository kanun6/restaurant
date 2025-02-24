"use client";

import { useEffect, useState } from "react";
import { fetchOrdersUser, cancelOrder } from "@/actions/actions";

interface Order {
  id: string;
  foodName: string;
  quantity: number;
  totalPrice: number;
  tableNumber: string;
  createdAt: string;
}

export default function OrderedFood() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      const response = await fetchOrdersUser();
      if (response.success && response.data) { // ตรวจสอบว่ามีข้อมูลก่อนใช้งาน
        setOrders(
          response.data.map(({ username: _, ...order }) => ({
            ...order,
            createdAt: new Date(order.createdAt).toISOString(),
          }))
        );
      } else {
        alert(`เกิดข้อผิดพลาด: ${response.error}`);
      }
    }
    loadOrders();
  }, []);

  // คำนวณราคารวมทั้งหมด
  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  // ฟังก์ชันยกเลิกคำสั่งซื้อ
  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?")) return;

    setLoading(orderId);
    const response = await cancelOrder(orderId);
    setLoading(null);

    if (response.success) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } else {
      alert(`ไม่สามารถยกเลิกคำสั่งซื้อได้: ${response.error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        คำสั่งซื้อของฉัน
      </h2>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-3 text-center">ชื่ออาหาร</th>
                <th className="border p-3 text-center">จำนวน</th>
                <th className="border p-3 text-center">ราคารวม</th>
                <th className="border p-3 text-center">โต๊ะที่จอง</th>
                <th className="border p-3 text-center">เวลาสั่ง</th>
                <th className="border p-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center hover:bg-gray-50">
                  <td className="border p-3 font-medium text-black">{order.foodName}</td>
                  <td className="border p-3 text-black">{order.quantity}</td>
                  <td className="border p-3 text-green-600 font-semibold">
                    {order.totalPrice.toLocaleString("th-TH")} บาท
                  </td>
                  <td className="border p-3 text-blue-600 font-semibold">
                    {order.tableNumber}
                  </td>
                  <td className="border p-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="border p-3">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className={`px-4 py-2 text-white font-semibold rounded-md transition ${
                        loading === order.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      disabled={loading === order.id}
                    >
                      {loading === order.id ? "กำลังยกเลิก..." : "⌫ ยกเลิก"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* แสดงราคารวมทั้งหมด */}
          <div className="text-right mt-4 text-xl font-bold text-green-700">
            ราคารวมทั้งหมด: {totalAmount.toLocaleString("th-TH")} บาท
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg"> คุณยังไม่ได้สั่งอาหาร</p>
      )}
    </div>
  );
}
