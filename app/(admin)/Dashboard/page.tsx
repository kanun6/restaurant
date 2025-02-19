"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import FavoriteChart from "@/components/Dashboard/FavoriteChart";

Chart.register(...registerables);

interface ProfileStats {
  totalProfiles: number;
  newProfilesLast7Days: number;
  activeUsersLast7Days: number;
}

export default function Dashboard() {
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ 1. เรียก `/api/get-profile-stats` ซึ่งมี `logUserActivity()` อยู่แล้ว
        const res = await fetch("/api/get-profile-stats");
        if (!res.ok) throw new Error("Failed to fetch data");

        const data: ProfileStats = await res.json();
        console.log("Profile Stats:", data);
        setProfileStats(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!profileStats) {
    return <p>Loading...</p>;
  }

  const chartData = {
    labels: ["ผู้ใช้ทั้งหมด", "สมัครใหม่ (7 วัน)", "เข้าใช้งาน (7 วัน)"],
    datasets: [
      {
        label: "จำนวนผู้ใช้",
        data: [
          profileStats.totalProfiles,
          profileStats.newProfilesLast7Days,
          profileStats.activeUsersLast7Days,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 สถิติผู้ใช้</h1>

      {/* แสดงสถิติเป็นตัวเลข */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ padding: "20px", background: "#f3f4f6", borderRadius: "8px" }}>
          <h2>👥 ผู้ใช้ทั้งหมด</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{profileStats.totalProfiles}</p>
        </div>
        <div style={{ padding: "20px", background: "#e0f7fa", borderRadius: "8px" }}>
          <h2>🆕 สมัครใหม่ใน 7 วัน</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{profileStats.newProfilesLast7Days}</p>
        </div>
        <div style={{ padding: "20px", background: "#d1c4e9", borderRadius: "8px" }}>
          <h2>📅 เข้าใช้งานใน 7 วัน</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{profileStats.activeUsersLast7Days}</p>
        </div>
      </div>

      {/* กราฟแท่ง */}
      <h2>📈 กราฟแสดงจำนวนผู้ใช้</h2>
      <div style={{ height: "300px", width: "80%" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top" },
            },
          }}
        />
        <FavoriteChart />
      </div>
    </div>
  );
}
