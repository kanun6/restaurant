import MyOrders from "@/components/user/MyOrders";

export default function UserOrdersPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">คำสั่งซื้อของฉัน</h1>

      {/* ✅ แสดงรายการคำสั่งซื้อของผู้ใช้ */}
      <MyOrders />
    </div>
  );
}
