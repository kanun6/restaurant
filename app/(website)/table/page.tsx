'use client';

import { useState, useEffect } from 'react';
import { getTables } from '@/actions/actions';

interface Table {
    id: string;
    tableNumber: string;
    seatingCapacity: number;
    availableDate: string; // ✅ เพิ่ม field availableDate
}

export default function UserTablesPage() {
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(() => {
        async function fetchTables() {
            const response = await getTables();
            if (response.success) {
                setTables(response.data);
            } else {
                alert(`เกิดข้อผิดพลาด: ${response.error}`);
            }
        }
        fetchTables();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">รายการโต๊ะ</h1>

            {tables.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {tables.map((table) => (
                        <div
                            key={table.id}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <h2 className="text-lg font-semibold text-gray-700">โต๊ะ {table.tableNumber}</h2>
                            <p className="text-gray-600">ที่นั่ง: {table.seatingCapacity}</p>
                            <p className="text-gray-500">
                                เปิดให้จอง: {new Date(table.availableDate).toLocaleDateString("th-TH")}
                            </p>
                            <p className="text-green-500 font-semibold">ว่าง</p>
                            <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                                จองโต๊ะ
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">ไม่มีโต๊ะให้จองในขณะนี้</p>
            )}
        </div>
    );
}
