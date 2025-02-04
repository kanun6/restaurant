"use client";

import { useState, useEffect } from "react";
import FoodList from "./FoodList";
import { useRouter } from "next/navigation";

const FoodContainer = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (foodItem) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === foodItem.id);
      let updatedFavorites;

      if (isFavorite) {
        updatedFavorites = prevFavorites.filter((item) => item.id !== foodItem.id);
      } else {
        updatedFavorites = [...prevFavorites, foodItem];
      }

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
      return updatedFavorites;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">รายการอาหาร</h2>
      <FoodList favorites={favorites} onToggleFavorite={toggleFavorite} />
      <button
        onClick={() => router.push("/favorite")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        ดูรายการโปรด ({favorites.length})
      </button>
    </div>
  );
};

export default FoodContainer;
