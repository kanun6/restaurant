import FoodCard from "../card/FoodCard"


const FoodList = ({foods}) => {
  return (
    <div>
      {
        foods.map((food)=>{
          return <FoodCard key={food.id} food={food}/>

        })
      }
    </div>
  )
}

export default FoodList

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Heart } from "lucide-react"; 

// const foodItems = [
//   { id: 1, image: "/images/ยำหมึก.jpg", name: "อาหาร 1", price: "฿100" },
//   { id: 2, image: "/images/แกงเห็ดสามอย่างใส่ฟักทอง.jpg", name: "อาหาร 2", price: "฿120" },
//   { id: 3, image: "/images/ขนมจีน.jpg", name: "อาหาร 3", price: "฿150" },
//   { id: 4, image: "/images/ไข่กระทะ.jpg", name: "อาหาร 4", price: "฿180" },
//   { id: 5, image: "/images/ชุดอาหารไทย.jpg", name: "อาหาร 5", price: "฿200" },
//   { id: 6, image: "/images/ชุดอาหารอีสาร.jpg", name: "อาหาร 6", price: "฿250" },
//   { id: 7, image: "/images/ต้มยำกุ้ง.jpg", name: "อาหาร 7", price: "฿300" },
//   { id: 8, image: "/images/ปลาแซลมอน.jpg", name: "อาหาร 8", price: "฿350" },
//   { id: 9, image: "/images/ผัดผักบุ้ง.jpg", name: "อาหาร 9", price: "฿400" },
//   { id: 10, image: "/images/แกงกะหรี่หรือมัสมั่นไก่.jpg", name: "อาหาร 10", price: "฿450" },
// ];

// const FoodList = ({ favorites, onToggleFavorite }) => {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//       {foodItems.map((item) => {
//         const isFavorite = favorites.some((fav) => fav.id === item.id);

//         return (
//           <motion.div
//             key={item.id}
//             className="border rounded-lg overflow-hidden shadow-md cursor-pointer relative"
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setSelected(item.id)}
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-40 object-cover"
//             />
//             <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2 text-center">
//               <p className="text-lg font-semibold">{item.name}</p>
//               <p className="text-sm">{item.price}</p>
//             </div>
//             {/* ปุ่มหัวใจ Toggle Favorite */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation(); // ป้องกันการเลือกอาหารเมื่อกดหัวใจ
//                 onToggleFavorite(item);
//               }}
//               className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
//             >
//               <Heart
//                 className={`w-6 h-6 ${
//                   isFavorite ? "fill-red-500 text-red-500" : "text-red-500"
//                 }`}
//               />
//             </button>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export default FoodList;