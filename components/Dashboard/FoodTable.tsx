import Image from "next/image";
import { FoodCardProps } from "@/utils/types";
// import FavoriteToggleButton from "./FavoriteToggleButton";
import Link from "next/link";
import DeleteFoodButton from "./FoodDeleteButton";

const FoodTable = ({ foods }: { foods: FoodCardProps[] }) => {
  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายการอาหาร</h1>
      
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 flex justify-center">
                <Link href={`/food/detail/${food.id}`}>
                  <Image src={food.image} alt={food.name} width={50} height={50} className="rounded-md" />
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/food/detail/${food.id}`} className="text-blue-500 hover:underline">
                  {food.name}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">{food.description.substring(0, 40)}...</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{food.price} บาท</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                  {/* ใช้ปุ่มลบที่แยกออกมา */}
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
