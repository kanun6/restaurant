"use client";

import { useState } from "react";
import { DeleteFoodAction } from "@/actions/actions";

const DeleteFoodButton = ({ foodId }: { foodId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("คุณต้องการลบอาหารนี้ใช่หรือไม่?");
    if (!confirmDelete) return;

    setLoading(true);
    const response = await DeleteFoodAction(foodId);
    setLoading(false);

    if (response.message.includes("Success")) {
      alert("ลบสำเร็จ!");
      window.location.reload(); // อัปเดตหน้าใหม่
    } else {
      alert("เกิดข้อผิดพลาด: " + response.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "กำลังลบ..." : "ลบ"}
    </button>
  );
};

export default DeleteFoodButton;
