import Link from "next/link";
import { LayoutDashboard, Utensils, Armchair , BarChart } from "lucide-react";
import Usericon from "../Navbar/Usericon";

export default function Sidebar() {
  return (
    <aside className="bg-white p-5 w-64 fixed inset-y-0 left-0 shadow-lg">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
      <h1><Usericon /></h1>     
      <nav className="space-y-4 mt-4">
        <Link href="/Dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <LayoutDashboard /> Dashboard
        </Link>
        <Link href="/Dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Utensils /> Add Menu
        </Link>
        <Link href="/Dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Armchair /> Add Table
        </Link>
        <Link href="/Dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <BarChart /> สถิติการใช้งาน
        </Link>
      </nav>
    </aside>
  );
}
