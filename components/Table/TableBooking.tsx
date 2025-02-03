"use client";

import { useState } from "react";

const TableBooking = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [tableId, setTableId] = useState(""); // เพิ่ม ID ของโต๊ะที่ต้องการจอง
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/utils/book-table", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, date, time, guests, tableId }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">จองโต๊ะ</h2>
      {message && <p className="text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="tel" placeholder="เบอร์โทร" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="text" placeholder="โต๊ะที่ต้องการจอง (Table ID)" value={tableId} onChange={(e) => setTableId(e.target.value)} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">จองโต๊ะ</button>
      </form>
    </div>
  );
};

export default TableBooking;
