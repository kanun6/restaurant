"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // Import Supabase client
import Sidebar from "@/components/Dashboard/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// กำหนด Type สำหรับข้อมูลที่มาจาก Supabase
type VisitData = {
  date: string;
  visits: number;
};

export default function Analytics() {
  const [data, setData] = useState<VisitData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: visits, error } = await supabase.from("analytics").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (visits) {
        setData(visits as VisitData[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-4">📊 สถิติการเข้าใช้งาน</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
