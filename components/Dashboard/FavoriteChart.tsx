"use client";

import { useEffect, useState } from "react";
import { fetchFavoriteStats } from "@/actions/actions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ✅ กำหนด Type ให้กับข้อมูล Favorite
interface FavoriteData {
  foodName: string;
  favoriteCount: number;
}

const FavoriteChart = () => {
  const [data, setData] = useState<FavoriteData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchFavoriteStats(); // ✅ TypeScript จะเข้าใจโครงสร้าง response

      if (response.success && response.data) {
        setData(response.data);
      } else {
        console.error(response.error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">เมนูยอดนิยม</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="foodName" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="favoriteCount" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">ยังไม่มีข้อมูล Favorite</p>
      )}
    </div>
  );
};

export default FavoriteChart;
