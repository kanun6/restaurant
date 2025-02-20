import Image from "next/image";
import { FoodCardProps } from "@/utils/types";
import Link from "next/link";
import DeleteFoodButton from "./FoodDeleteButton";

const FoodTable = ({ foods }: { foods: FoodCardProps[] }) => {
  return (
    <div className="overflow-x-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">รายการอาหาร</h1>

      <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-4 py-2">รูปภาพ</th>
            <th className="border border-gray-300 px-4 py-2">ชื่ออาหาร</th>
            <th className="border border-gray-300 px-4 py-2">รายละเอียด</th>
            <th className="border border-gray-300 px-4 py-2">ราคา</th>
            <th className="border border-gray-300 px-4 py-2">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="hover:bg-gray-100 transition duration-200">
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <Link href={`/food/detail/${food.id}`} className="block">
                  <Image 
                    src={food.image} 
                    alt={food.name} 
                    width={50} 
                    height={50} 
                    className="rounded-md w-12 h-12 object-cover shadow-md"
                  />
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                <Link href={`/food/detail/${food.id}`} className="text-blue-500 hover:underline">
                  {food.name}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">
                {food.description?.substring(0, 40) ?? ""}...
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-bold">
                {food.price.toLocaleString("th-TH")} บาท
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <DeleteFoodButton foodId={food.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
