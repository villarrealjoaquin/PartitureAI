"use client";

import { CardIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  componentNames,
  COMPONENTS,
  components_keys,
  STEPS,
} from "@/constants";
import mock from "@/mock/components.json";
import { API } from "@/services";
import type { Component, ComponentType, ComponentValues } from "@/types";
import { checkAllComponentsExist } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const response = await API.sendComponents(selectedComponents);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToComponentSelected = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    const condition = currentStep >= STEPS.length - 1;
    if (condition) return;
    setCurrentStep(currentStep + 1);
  };

  const handleAddComponent = (key: string, component: Component) => {
    const key_component = key;
    setSelectedComponents({
      ...selectedComponents,
      [components_keys[key_component]]: component,
    });
    handleNextStep();
  };

  const currentComponent = STEPS[currentStep] as ComponentValues;

  return (
    <TooltipProvider>
      <section className="flex gap-3">
        <div className="flex flex-col w-1/2 sm:w-1/3">
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-3 h-[65vh] border-r border-[#B94CED] overflow-auto">
            {Object.entries(COMPONENTS).map(([key, Value], i: number) => {
              const condition = key === currentComponent ? "#B94CED" : "#fff";
              const componentKey = key as ComponentValues;
              return (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleGoToComponentSelected(i)}
                      className="cursor-pointer"
                    >
                      <Value color={condition} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {componentNames[componentKey]}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          <form
            onSubmit={handleSubmitComponents}
            className="border-t border-r border-b border-[#B94CED] pt-2"
          >
            <div
              className={`grid ${Object.values(selectedComponents).length !== 0 ? "grid-cols-1 sm:grid-cols-2 gap-4" : "flex justify-center items-center"} text-[#A5A5A5] h-[135px] w-full`}
            >
              {Object.values(selectedComponents).length !== 0 ? (
                Object.entries(selectedComponents).map(([key, component]) => (
                  <div key={key} className="px-2">
                    <p className="text-sm truncate">
                      {key}: {component.name}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center max-w-[30rem]">
                  ¡Ups! Parece que no has elegido ningún componente aún 🛠️.
                  ¡Vamos a construir esa máquina de ensueño!
                </p>
              )}
            </div>
            <div className="flex justify-center w-full my-2">
              <Button
                disabled={!checkAllComponentsExist(selectedComponents)}
                className="bg-[#B94CED] truncate md:w-full mx-2 hover:bg-[#b065d2]"
              >
                Analizar compatibilidad de mis componentes
              </Button>
            </div>
          </form>
        </div>
        <div className="overflow-y-auto min-h-[750px]">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 animate-fade-in"
            key={currentStep}
          >
            {mock[currentComponent].map((component: any) => (
              <li
                key={component.id}
                onClick={() =>
                  handleAddComponent(
                    component.type_component,
                    component as Component,
                  )
                }
                className="flex p-4 sm:p-6 bg-[#1f2937] text-white border border-[#B94CED] rounded-lg w-[400px] transform transition-transform duration-300 hover:scale-105 hover:bg-[#374151] hover:shadow-lg"
              >
                <Image
                  src={component.image}
                  className="object-contain rounded-lg mr-4"
                  width={79}
                  height={79}
                  alt={component.name}
                />
                <div className="flex flex-col justify-between flex-grow">
                  <h3 className="font-semibold truncate w-[200px]">
                    {component.name}
                  </h3>
                  <p className="text-[#B94CED] text-sm font-bold">
                    {component.manufacturer}
                  </p>
                  <p className="text-[#A5A5A5]">
                    {component.base_clock
                      ? component.base_clock
                      : component.price}
                  </p>
                </div>
                <div className="ml-auto flex items-end">
                  <CardIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </TooltipProvider>
  );
}
