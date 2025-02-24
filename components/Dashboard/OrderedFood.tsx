"use client";

import { useEffect, useState } from "react";
import { fetchOrders } from "@/actions/actions";

interface Order {
  id: string;
  foodName: string;
  quantity: number;
  totalPrice: number;
  username: string;
  tableNumber: string;
  createdAt: string;
}

export default function OrderedFood() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await fetchOrders();
      console.log(response); // ตรวจสอบค่าที่ได้รับจาก API
      if (response.success && Array.isArray(response.data)) {
        setOrders(response.data.map(order => ({
          ...order,
          createdAt: typeof order.createdAt === 'string' ? order.createdAt : new Date(order.createdAt).toISOString(),
        })));
      } else {
        setOrders([]);
        alert(`เกิดข้อผิดพลาด: ${response.error}`);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">รายการอาหารที่ถูกสั่ง</h2>
      {orders.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ชื่ออาหาร</th>
              <th className="border p-2">จำนวน</th>
              <th className="border p-2">ราคารวม</th>
              <th className="border p-2">ผู้สั่ง</th>
              <th className="border p-2">โต๊ะที่จอง</th>
              <th className="border p-2">เวลาสั่ง</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.foodName}</td>
                <td className="border p-2">{order.quantity}</td>
                <td className="border p-2">฿{order.totalPrice}</td>
                <td className="border p-2 font-semibold text-blue-600">{order.username}</td>
                <td className="border p-2 text-gray-600">{order.tableNumber}</td>
                <td className="border p-2 text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">ยังไม่มีคำสั่งซื้อ</p>
      )}
    </div>
  );
}
