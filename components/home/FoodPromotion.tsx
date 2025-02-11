"use client";

// import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const promotions = [
  "/images/promo1.jpg",
  "/images/promo2.jpg",
  "/images/promo3.jpg",
  "/images/promo4.jpg",
  "/images/promo5.jpg",
  "/images/promo6.jpg",
];

const FoodPromotion = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg shadow-lg"
      >
        {promotions.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Promotion ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodPromotion;
