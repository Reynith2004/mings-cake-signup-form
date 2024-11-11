import React from "react";
import MainLayouts from "@/components/layout/MainLayouts";

export default function Home() {
  return (
    <MainLayouts>
      <div
        className="relative bg-cover bg-center w-[1920px] h-[1080px] mx-auto py-24 px-6"
        style={{
          backgroundImage: "url('https://www.baltana.com/files/wallpapers-18/Chocolate-Cake-HD-Wallpaper-46549.jpg')",
          maxWidth: "99vw",
          maxHeight: "79vh",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Delicious Cakes Are Here!</h1>
          <p className="text-lg mb-6">
          Discover our mouth-watering collection of freshly baked cakes.
           Made with love, perfect for your special moments.
          </p>
          <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200">
          Browse Cake Collection
          </button>
        </div>
      </div>
    </MainLayouts>
  );
}