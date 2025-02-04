"use client";

import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">รายการโปรดของคุณ</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีอาหารที่ถูกใจ</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-md relative">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2 text-center">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
