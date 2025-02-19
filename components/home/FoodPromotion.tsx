"use client";

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
    <div className="w-full max-w-6xl mx-auto p-4"> 
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
          <SwiperSlide key={index} className="flex justify-center">
            <Image
              src={image}
              alt={`Promotion ${index + 1}`}
              width={1200}
              height={400} // ✅ ลดความสูงให้สมดุลกับพื้นที่
              className="w-full h-auto object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodPromotion;
