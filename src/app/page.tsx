"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const cardsContent = [
  {
    id: 1,
    title: "Construcción enteramente personalizada",
    descripcion:
      "Vos podés armar tu propia PC con los componentes que más te gusten, brindándote una experiencia absolutamente individual.",
  },
  {
    id: 2,
    title: "Descripciones claves",
    descripcion:
      "Te brindamos una descripción clara y precisa de la funcionalidad del componente.",
  },
  {
    id: 3,
    title: "Análisis por IA",
    descripcion:
      "Te ofrecemos un análisis interactivo realizado mediante IA para que tengas un mejor panorama de la compatibilidad de tus componentes.",
  },
  {
    id: 4,
    title: "Construcción enteramente personalizada",
    descripcion:
      "Vos podés armar tu propia PC con los componentes que más te gusten, brindándote una experiencia absolutamente individual.",
  }
];

export default function Home() {
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
    <>
      <Navbar />
      <main className="flex flex-col items-center pb-28">
        <section className="flex items-center gap-32 pt-40">
          <div className="flex flex-col items-start gap-10">
            <div>
              <h1 className="text-[3rem] text-[#B94CED] font-bold max-w-[850px]">
                Arma la computadora de tus sueños y corrobora la compatibilidad
                de sus componentes con IA
              </h1>
              <span className="text-[1.4rem] text-[#A5A5A5]">
                Descubre la gloria de construir lo que sueñas
              </span>
            </div>
            <button className="capitalize p-2 bg-[#B94CED] rounded-xl text-white text-[1.6rem] font-bold w-[200px]">
              Empecemos
            </button>
          </div>
          <div className="border border-[#B94CED] w-[600px] h-[550px] rounded-[15px] blur"></div>
          <div
            className="border w-[600px] h-[550px] rounded-[15px] fixed left-[71.8rem] flex items-center justify-center overflow-hidden"
            style={{ borderColor }}
          >
            <div className="flex flex-col w-[400px] h-full overflow-hidden relative">
              
                <ul className="flex flex-col items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                  {cardsContent.map((e) => (
                    <li
                      key={e.id}
                      className="border border-[#B94CED] rounded-2xl p-5 bg-[#040810] mb-8 w-full"
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
                      className="border border-[#B94CED] rounded-2xl p-5 bg-[#040810] mb-8 w-full"
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
        </section>
      </main>
      <Footer />
    </>
  );
}
