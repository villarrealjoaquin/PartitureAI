"use client";

import { useEffect, useState } from "react";
import CardList from "./CardList/CardList";

function Carousel() {
  const [borderColor, setBorderColor] = useState("#B94CED");

  useEffect(() => {
    const colors = ["#B94CED", "#4D4A4A"];
    let index = 0;

    const interval = setInterval(
      () => {
        index = (index + 1) % colors.length;
        setBorderColor(colors[index]);
      },
      Math.floor(Math.random() * 1000) + 200,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-[380px] sm:w-[500px] lg:w-[600px] h-[550px] rounded-[15px]">
      <div className="absolute inset-0 border border-[#B94CED] rounded-[15px] blur"></div>
      <div
        className="relative border w-[380px] sm:w-[500px] lg:w-[600px] h-[550px] rounded-[15px] flex items-center justify-center overflow-hidden"
        style={{ borderColor }}
      >
        <div className="flex flex-col w-[400px] h-full overflow-hidden relative">
          <CardList />
          <CardList />
        </div>
      </div>
    </section>
  );
}

export default Carousel;
