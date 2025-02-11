"use client";
import { useEffect, useState } from "react";

const Background = () => {
  const images = [
    // "/images/bg1.png",
    // "/images/bg2.jpg",
    // "/images/bg3.jpg",
    // "/images/bg4.jpg",
    // "/images/bg5.jpg",
    // "/images/bg6.jpg",
    // "/images/bg7.jpg",
    "/images/bg14.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const backgroundStyle = {
    position: "fixed" as const,  
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${images[currentIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,  
    transition: "background-image 1s ease-in-out"
  };

  return <div style={backgroundStyle}></div>;
};

export default Background;
