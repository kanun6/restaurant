

import AddFooDpage from "@/components/Dashboard/AddFood";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Analytics from "./analytics";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-sky-100">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>โต๊ะที่ใช้งาน</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">12</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>ออเดอร์ที่รอเสิร์ฟ</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">8</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>รายได้วันนี้</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">฿4,500</p></CardContent>
          </Card>
        </div>
        <div>
        <AddFooDpage />
        {/* <Analytics /> */}
        </div>
      </main>  
    </div>
  );
}
