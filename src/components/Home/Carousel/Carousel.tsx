'use client'

import { cardsContent } from "@/constants/constants";
import { useEffect, useState } from "react";

function Carousel() {
    const [borderColor, setBorderColor] = useState("#B94CED");

    useEffect(() => {
      const colors = ["#B94CED", "#4D4A4A"];
      let index = 0;
  
      const interval = setInterval(() => {
        index = (index + 1) % colors.length;
        setBorderColor(colors[index]);
      }, Math.floor(Math.random() * 1000) + 200);
  
      return () => clearInterval(interval);
    }, []);

    
  return (
    <div className="relative w-[380px] sm:w-[500px] lg:w-[600px] h-[550px] rounded-[15px]">
      <div className="absolute inset-0 border border-[#B94CED] rounded-[15px] blur"></div>
      <div
        className="relative border w-[380px] sm:w-[500px] lg:w-[600px] h-[550px] rounded-[15px] flex items-center justify-center overflow-hidden"
        style={{ borderColor }}
      >
        <div className="flex flex-col w-[400px] h-full overflow-hidden relative">
          <ul className="flex flex-col items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {cardsContent.map((e) => (
              <li
                key={e.id}
                className="border border-[#B94CED] rounded-2xl p-5 bg-[#040810] mb-8 sm:w-full"
              >
                <span className="text-[#B94CED] font-bold">{e.title}</span>
                <p className="text-[#A5A5A5] text-[0.9rem] max-w-[400px] mt-2">
                  {e.descripcion}
                </p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {cardsContent.map((e) => (
              <li
                key={e.id}
                className="border border-[#B94CED] rounded-2xl p-5 bg-[#040810] mb-8 sm:w-full"
              >
                <span className="text-[#B94CED] font-bold">{e.title}</span>
                <p className="text-[#A5A5A5] text-[0.9rem] max-w-[400px] mt-2">
                  {e.descripcion}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
