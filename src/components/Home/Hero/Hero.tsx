import AnimatedButton from "@/components/AnimatedButton/Button";
import Carousel from "../Carousel/Carousel";

function Hero() {
  return (
    <section className="gradient-background flex flex-wrap items-center justify-center xl:justify-center gap-32 pt-40">
      <div className="px-4 sm:px-0 flex flex-col items-center xl:items-start gap-10">
        <div className="flex flex-col justify-center lg:justify-start">
          <h1 className="text-center xl:text-start text-[2rem] lg:text-[3rem] text-[#B94CED] font-bold max-w-[850px]">
            Arma la computadora de tus sueños y corrobora la compatibilidad de
            sus componentes con IA
          </h1>
          <span className="text-center xl:text-start text-[1.2rem] lg:text-[1.4rem] text-[#A5A5A5]">
            Descubre la gloria de construir lo que sueñas
          </span>
        </div>
        <AnimatedButton text="empecemos" />
      </div>
      <div className="hidden md:block">
        <Carousel />
      </div>
    </section>
  );
}

export default Hero;
