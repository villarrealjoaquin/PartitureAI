import type { Component, ComponentKeys } from "@/types";
import * as data from "@/mock/components.json";
import Image from "next/image";
import { CardIcon } from "../Icons";

export const ComponentItem = ({
  currentComponent,
  onAddComponent,
}: {
  currentComponent: string;
  onAddComponent: (key: ComponentKeys, component: Component) => void;
}) => {
  return (
    <>
      {data[currentComponent as ComponentKeys].map((component: any) => (
        <li
          key={component.id}
          onClick={() =>
            onAddComponent(component.type_component, component as Component)
          }
          className="flex cursor-pointer p-4 sm:p-6 bg-[#151922] text-white border border-[#B94CED] rounded-lg w-full lg:w-full xl:w-[420px] transform transition-transform duration-300 hover:scale-105 hover:bg-[#56246d] active:scale-100"
        >
          <Image
            src={component.image}
            className="object-contain rounded-lg mr-4"
            width={79}
            height={79}
            alt={component.name}
          />
          <div className="flex flex-col justify-between flex-grow">
            <h3 className="font-semibold truncate w-[100px] sm:w-[200px]">
              {component.name}
            </h3>
            <p className="text-[#B94CED] text-sm font-bold">
              {component.manufacturer}
            </p>
            <p className="text-[#A5A5A5]">
              {component.base_clock ? component.base_clock : component.price}
            </p>
          </div>
          <div className="hidden ml-auto sm:flex items-end">
            <CardIcon />
          </div>
        </li>
      ))}
    </>
  );
};
