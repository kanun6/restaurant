"use client";
// import { useEffect, useState } from "react";

const Background = () => {
  const image = "/images/bg14.jpg";

  const backgroundStyle = {
    position: "fixed" as const,  
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1  
  };

  return <div style={backgroundStyle}></div>;
};

export default Background;