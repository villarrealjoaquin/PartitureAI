"use client";

import { CardIcon } from "@/components/Icons";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import * as data from "@/mock/components.json";
import { API } from "@/services";
import type {
  Component,
  ComponentKeys,
  ComponentType,
  ComponentValues,
} from "@/types";
import { checkAllComponentsExist } from "@/utils";
import Image from "next/image";
import { useState } from "react";

const percentageColor = (percentage: number) => {
  let color: "green" | "yellow" | "red" = "green";
  if (percentage <= 30) {
    color = "red";
  }
  if (percentage <= 70) {
    color = "yellow";
  }
  if (percentage > 70) {
    color = "green";
  }
  console.log(color, "color");

  return color;
};

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );
  const [selectedValue, setSelectedValue] = useState("cpu");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [percentages, setPercentages] = useState({
    compatibility: 0,
    cuelloDeBotella: 0,
  });
  const [answer, setAnswer] = useState("");

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const response = await API.sendComponents(selectedComponents);
      console.log(response, "response");
      setPercentages(response.percentages);
      setAnswer(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
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
    if (selectedComponents.hasOwnProperty(key_component)) {
      if (key === "memory_ram") {
        const ram = selectedComponents[key_component as ComponentKeys];
        const quantity = ram.quantity ?? 0;
        if (quantity >= 4) handleNextStep();
        setSelectedComponents({
          ...selectedComponents,
          [components_keys[key_component]]: {
            ...ram,
            quantity: quantity + 1,
          },
        });
      }
      return;
    }
    setSelectedComponents({
      ...selectedComponents,
      [components_keys[key_component]]: { ...component, quantity: 1 },
    });
    handleNextStep();
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    const index = Object.keys(COMPONENTS).indexOf(value);
    handleGoToComponentSelected(index);
  };

  const handleCloseModal = () => {
    setAnswer("");
    setOpenModal(!openModal);
  };

  const currentComponent = STEPS[currentStep] as ComponentValues;

  return (
    <TooltipProvider>
      <section className="gradient-background-2 flex flex-col lg:flex-row gap-3 border-b border-[#B94CED]">
        <div className="hidden w-1/2 lg:w-[700px] lg:flex lg:flex-col">
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
            className="border-t border-r  border-[#B94CED] pt-2"
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
            <Modal isOpen={openModal} onClose={handleCloseModal}>
              <div className="timeline">
                <p className="text-white mt-5 pt-5 pr-4 max-w-4xl">
                  {answer ? (
                    <>
                      <span className="text-sm text-pretty">{answer}</span>
                      <p
                        className={`text-[${percentageColor(Number(percentages.compatibility))}]`}
                      >
                        {percentages.compatibility}
                      </p>
                      <p
                        className={`text-[${percentageColor(Number(percentages.cuelloDeBotella))}]`}
                      >
                        {percentages.cuelloDeBotella}
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-1/2 h-[10px]" />
                      <Skeleton className="w-10/12 h-[10px]" />
                      <Skeleton className="w-full h-[10px]" />
                    </div>
                  )}
                </p>
                {answer && (
                  <div className="pl-5">
                    {selectedOption === null && (
                      <>
                        <div>
                          <button
                            className="border rounded-md py-2 px-4 text-white border-[#B94CED] m-1 hover:bg-[#B94CED]"
                            onClick={() =>
                              handleOptionClick("Que componentes recomiendas?")
                            }
                          >
                            Que componentes recomiendas?
                          </button>
                          <button
                            className="border rounded-md py-2 px-4 text-white border-[#B94CED] m-1 hover:bg-[#B94CED]"
                            onClick={() =>
                              handleOptionClick(
                                "Que pasaria si la ensamblo como esta?",
                              )
                            }
                          >
                            Que pasaria si la ensamblo como esta?
                          </button>
                          <button
                            className="border rounded-md py-2 px-4 text-white border-[#B94CED] m-1 hover:bg-[#B94CED]"
                            onClick={() =>
                              handleOptionClick("Que componentes recomiendas?")
                            }
                          >
                            Que componentes recomiendas?
                          </button>
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                          <Input
                            className="m-1 w-[500px] bg-transparent border-[#B94CED] text-white"
                            placeholder="Tienes una pregunta? escribela!"
                          />
                          <Button
                            type="submit"
                            className="bg-[#B94CED] hover:bg-[#B94CED]"
                          >
                            Enviar
                          </Button>
                        </div>
                      </>
                    )}
                    {selectedOption && (
                      <button className="border rounded-md py-2 px-4 text-white border-[#B94CED] m-1 bg-[#B94CED]">
                        {selectedOption}
                      </button>
                    )}
                  </div>
                )}
              </div>
              {/* <button
                onClick={() => setOpenModal(!openModal)}
                className="mt-4 p-2 bg-[#B94CED] text-white rounded hover:bg-blue-600"
              >
                Cerrar
              </button> */}
            </Modal>
            <div className="flex justify-center w-full my-2">
              <Button
                disabled={!checkAllComponentsExist(selectedComponents)}
                onClick={() => setOpenModal(!openModal)}
                className="bg-[#B94CED] truncate md:w-full mx-2 hover:bg-[#b065d2]"
              >
                Analizar compatibilidad de mis componentes
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col w-full mt-5 p-4 lg:hidden">
          <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full bg-transparent border-[#B94CED] text-white">
              <SelectValue placeholder="Componentes" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-[#B94CED] text-white">
              {Object.entries(componentNames).map(([key, name]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <form
            onSubmit={handleSubmitComponents}
            className="flex flex-col flex-grow border border-[#B94CED] mt-4 rounded-lg pt-2 "
          >
            <div
              className={`lg:grid ${Object.values(selectedComponents).length !== 0 ? "lg:grid-cols-2 gap-4" : "flex justify-center items-center"} text-[#A5A5A5] h-[175px] lg:h-[135px] w-full`}
            >
              {Object.values(selectedComponents).length !== 0 ? (
                Object.entries(selectedComponents).map(([key, component]) => (
                  <div key={key} className="px-2">
                    <p className="text-sm truncate ">
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
                className="bg-[#B94CED] truncate w-full mx-2 hover:bg-[#b065d2]"
              >
                Analizar compatibilidad de mis componentes
              </Button>
            </div>
          </form>
        </div>
        <div className="overflow-y-auto lg:h-[780px] w-[100%] lg:w-[90%]">
          <ul
            className="flex flex-wrap overflow-x-auto justify-center lg:justify-start gap-4 p-4 animate-fade-in"
            key={currentStep}
          >
            {data[currentComponent].map((component: any) => (
              <li
                key={component.id}
                onClick={() =>
                  handleAddComponent(
                    component.type_component,
                    component as Component,
                  )
                }
                className="z-10 flex cursor-pointer p-4 sm:p-6 bg-[#151922] text-white border border-[#B94CED] rounded-lg w-full lg:w-full xl:w-[420px] transform transition-transform duration-300 hover:scale-105 hover:bg-[#56246d] active:scale-100"
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
                    {component.base_clock
                      ? component.base_clock
                      : component.price}
                  </p>
                </div>
                <div className="hidden ml-auto sm:flex items-end">
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
