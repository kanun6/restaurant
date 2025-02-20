const AboutPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white/90 p-8 rounded-xl shadow-lg max-w-3xl w-full border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">เกี่ยวกับเรา</h1>
        <p className="text-lg text-gray-700 text-center mb-4">
          ยินดีต้อนรับสู่ <span className="font-semibold text-blue-600">ระบบจัดการร้านอาหาร</span> 
          เว็บไซต์ของเราถูกออกแบบมาเพื่อช่วยให้ร้านอาหารสามารถจัดการโต๊ะและการจองได้อย่างมีประสิทธิภาพ
        </p>

        {/* จุดประสงค์ของระบบ */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-red-500 flex items-center gap-2">
            จุดประสงค์ของระบบ
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>ช่วยให้ลูกค้าสามารถจองโต๊ะล่วงหน้าได้</li>
            <li>จัดการสถานะโต๊ะในร้านได้แบบเรียลไทม์</li>
            <li>ช่วยให้เจ้าของร้านมองเห็นภาพรวมของการจองโต๊ะ</li>
          </ul>
        </div>

        {/* ฟีเจอร์หลักของระบบ */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-pink-500 flex items-center gap-2">
            ฟีเจอร์หลักของระบบ
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>เพิ่ม, ลบ, และแก้ไขข้อมูลโต๊ะ</li>
            <li>แสดงรายการโต๊ะพร้อมสถานะ (ว่าง/จองแล้ว)</li>
            <li>ระบบล็อกอินที่ปลอดภัยผ่าน Clerk</li>
            <li>จัดเก็บข้อมูลด้วย Supabase และ Prisma</li>
          </ul>
        </div>

        {/* ติดต่อเรา */}
        <div>
          <h2 className="text-2xl font-semibold text-red-600 flex items-center gap-2">
            ติดต่อเรา
          </h2>
          <p className="text-gray-700 mb-2">หากคุณมีคำถามหรือข้อเสนอแนะ ติดต่อเราได้ที่:</p>
          <p className="font-semibold text-blue-500 underline cursor-pointer">
            support@restaurant-system.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
