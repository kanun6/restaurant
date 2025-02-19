"use client";

import { useState } from "react";
import { orderFood } from "@/actions/actions";

interface OrderButtonProps {
  foodId: string;
}

export default function OrderButton({ foodId }: OrderButtonProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    setLoading(true);
    const response = await orderFood(foodId, quantity);
    setLoading(false);

    if (response.success) {
      alert("✅ สั่งอาหารสำเร็จ!");
    } else {
      alert(`❌ เกิดข้อผิดพลาด: ${response.error}`);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-16 p-2 border rounded-md text-center"
      />
      <button
        onClick={handleOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "กำลังสั่ง..." : "สั่งอาหาร"}
      </button>
    </div>
  );
}
