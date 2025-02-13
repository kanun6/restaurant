"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

import Background from "@/components/home/Background";
import Providers from "@/app/Providers";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/Dashboard"); // ✅ เช็คว่าหน้าเป็น Dashboard หรือไม่

  // ✅ ถ้าเป็นหน้า Dashboard ให้ return `{children}` อย่างเดียว
  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <Providers>
      <Background />
      <Navbar />
      <main className="container">{children}</main>
    </Providers>
  );
}
