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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/get-profile-stats");

        if (!res.ok) {
          if (res.status === 401) throw new Error("คุณต้องเข้าสู่ระบบก่อน");
          throw new Error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }

        const data: ProfileStats = await res.json();
        setProfileStats(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
        } else {
          setError("เกิดข้อผิดพลาดที่ไม่คาดคิด");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const chartData = {
    labels: ["ผู้ใช้ทั้งหมด", "สมัครใหม่ (7 วัน)", "เข้าใช้งาน (7 วัน)"],
    datasets: [
      {
        label: "จำนวนผู้ใช้",
        data: [
          profileStats!.totalProfiles,
          profileStats!.newProfilesLast7Days,
          profileStats!.activeUsersLast7Days,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const styles = {
    container: { padding: "20px" },
    statBox: {
      padding: "20px",
      borderRadius: "8px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    userBox: { background: "#f3f4f6" },
    newUsersBox: { background: "#e0f7fa" },
    activeUsersBox: { background: "#d1c4e9" },
    chartContainer: { height: "300px", width: "80%" },
  };

  return (
    <div style={styles.container}>
      <h1>สถิติผู้ใช้</h1>

      {/* แสดงสถิติเป็นตัวเลข */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ ...styles.statBox, ...styles.userBox }}>
          <h2>ผู้ใช้ทั้งหมด</h2>
          <p>{profileStats!.totalProfiles}</p>
        </div>
        <div style={{ ...styles.statBox, ...styles.newUsersBox }}>
          <h2>สมัครใหม่ใน 7 วัน</h2>
          <p>{profileStats!.newProfilesLast7Days}</p>
        </div>
        <div style={{ ...styles.statBox, ...styles.activeUsersBox }}>
          <h2>เข้าใช้งานใน 7 วัน</h2>
          <p>{profileStats!.activeUsersLast7Days}</p>
        </div>
      </div>

      {/* กราฟแท่ง */}
      <h2>กราฟแสดงจำนวนผู้ใช้</h2>
      <div style={styles.chartContainer}>
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
