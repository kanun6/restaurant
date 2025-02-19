'use client';

import { useState, useEffect, useOptimistic, startTransition } from 'react';
import { getTables, addTable, deleteTable } from '@/actions/actions';
import ReservedTables from '@/components/Dashboard/ReservedTables';

interface Table {
    id: string;
    tableNumber: string;
    seatingCapacity: number;
    availableDate: string;
}

type Action =
    | { type: 'add'; data: Table }
    | { type: 'delete'; id: string };

export default function TablesPage() {
    const [tableNumber, setTableNumber] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState('');
    const [availableDate, setAvailableDate] = useState('');

    // ✅ โหลดข้อมูลโต๊ะจากฐานข้อมูล
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

    // ✅ ใช้ useOptimistic อัปเดตตารางทันทีเมื่อมีการเพิ่ม/ลบโต๊ะ
    const [optimisticTables, setOptimisticTables] = useOptimistic<Table[], Action>(tables, (currentTables, action) => {
        switch (action.type) {
            case 'add':
                return [...currentTables, action.data];
            case 'delete':
                return currentTables.filter((table) => table.id !== action.id);
            default:
                return currentTables;
        }
    });

    // ✅ ฟังก์ชันเพิ่มโต๊ะ พร้อมระบุวัน
    const handleAddTable = async () => {
        if (!tableNumber || !seatingCapacity || !availableDate) {
            alert('กรุณากรอกข้อมูลให้ครบ');
            return;
        }

        const response = await addTable(tableNumber, Number(seatingCapacity), availableDate);
        if (response.success) {
            startTransition(() => {
                setOptimisticTables({ type: 'add', data: response.data });
            });
            setTableNumber('');
            setSeatingCapacity('');
            setAvailableDate('');
        } else {
            alert(`เกิดข้อผิดพลาด: ${response.error}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">จัดการโต๊ะ</h1>

            {/* ส่วนเพิ่มโต๊ะ */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="หมายเลขโต๊ะ"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded-md"
                />
                <input
                    type="number"
                    placeholder="จำนวนที่นั่ง"
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded-md"
                />
                <input
                    type="date"
                    placeholder="วันที่เปิดให้จอง"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                    className="w-full md:w-1/3 p-2 border rounded-md"
                />
                <button
                    onClick={handleAddTable}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    เพิ่มโต๊ะ
                </button>
            </div>

            {/* ตารางแสดงรายการโต๊ะ */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border">หมายเลขโต๊ะ</th>
                            <th className="p-3 border">จำนวนที่นั่ง</th>
                            <th className="p-3 border">วันที่เปิดให้จอง</th>
                            <th className="p-3 border">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optimisticTables.length > 0 ? (
                            optimisticTables.map((table) => (
                                <tr key={table.id} className="text-center border">
                                    <td className="p-3 border">{table.tableNumber}</td>
                                    <td className="p-3 border">{table.seatingCapacity}</td>
                                    <td className="p-3 border">
                                        {new Date(table.availableDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => deleteTable(table.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    ไม่มีโต๊ะในระบบ
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ReservedTables />
        </div>
    );
}
