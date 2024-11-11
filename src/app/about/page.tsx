import React from "react";
import MainLayouts from "@/components/layout/MainLayouts";
const page: React.FC = () => {
  return (
    <MainLayouts>
      <div
        className="bg-[#F5F5F7] py-12 px-6"
        style={{ maxWidth: "100vw", maxHeight: "79vh", margin: "0 auto" }}
      >
        <h1 className="text-4xl font-bold mb-6">About Ming's Cake</h1>
        <div>
          <p className="text-lg mb-4">
            Welcome to <strong>Ming's Cake</strong>! We are passionate about
            crafting cake crafting delicious, beautifully designed cakes that make every celebration sweeter and help you express your unique taste.
          </p>
          <h2 className="text-3xl font-semibold mt-6 mb-2">Our Mission</h2>
          <p className="text-lg mb-4">
          At Dreamy Cakes, our mission is to create delightful, handcrafted cakes
           that bring joy to every celebration. We believe in using the finest 
           ingredients and innovative designs to turn your sweetest dreams into reality,
            one slice at a time.
          </p>
          <h2 className="text-3xl font-semibold mt-6 mb-2">Our Philosophy</h2>
          <p className="text-lg mb-4">
          At Dreamy Cakes, we believe that every cake tells a story. Whether it's a birthday, 
          wedding, or any special occasion, our philosophy is simple: 
          create cakes that not only taste extraordinary but also capture the essence of the moment
          . We’re dedicated to using the highest quality ingredients, 
          fostering creativity in every design, and spreading joy through every bite.
          </p>
        
        </div>
      </div>
    </MainLayouts>
  );
};

export default page;