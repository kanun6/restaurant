"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const foodItems = [
  { image: "/images/Food1.jpg", name: "อาหาร 1", price: "฿100" },
  { image: "/images/Food2.jpg", name: "อาหาร 2", price: "฿120" },
  { image: "/images/Food3.jpg", name: "อาหาร 3", price: "฿150" },
  { image: "/images/Food4.jpg", name: "อาหาร 4", price: "฿180" },
  { image: "/images/Food5.jpg", name: "อาหาร 5", price: "฿200" },
  { image: "/images/Food6.jpg", name: "อาหาร 6", price: "฿250" },
  { image: "/images/Food7.jpg", name: "อาหาร 7", price: "฿300" },
  { image: "/images/Food8.jpg", name: "อาหาร 8", price: "฿350" },
  { image: "/images/Food9.jpg", name: "อาหาร 9", price: "฿400" },
  { image: "/images/Food10.jpg", name: "อาหาร 10", price: "฿450" },
];

const FoodContainer = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">รายการอาหาร</h2>
      <FoodList items={foodItems} />
    </div>
  );
};

const FoodList = ({ items }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="border rounded-lg overflow-hidden shadow-md cursor-pointer relative"
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelected(index)}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2 text-center">
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="text-sm">{item.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FoodContainer;