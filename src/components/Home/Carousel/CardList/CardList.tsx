import { cardsContent } from "@/constants";

function CardList() {
  return (
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
  );
}

export default CardList;
