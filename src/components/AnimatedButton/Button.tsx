"use client";
import { useRouter } from "next/navigation";

function AnimatedButton({ text }: { text: string }) {
  const router = useRouter();

  return (
    <button
      className="relative inline-flex items-center justify-center p-4 px-10 text-[1.2rem] py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
      onClick={() => router.push("/build-pc")}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="absolute  capitalize flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
        {text}
      </span>
      <span className="relative capitalize invisible">{text}</span>
    </button>
  );
}

export default AnimatedButton;
