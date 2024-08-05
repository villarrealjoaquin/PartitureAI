"use client";

import { ComponentsList } from "@/components/build-pc";
import Modal from "@/components/Modal/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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
import { API } from "@/services";
import type {
  Component,
  ComponentKeys,
  ComponentType,
  ComponentValues,
} from "@/types";
import { checkAllComponentsExist } from "@/utils";
import { useState } from "react";

export type Analysis = {
  type: string;
  text: string;
  value: number | string;
  condition: boolean;
};

export default function Page() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );
  const [selectedValue, setSelectedValue] = useState("cpu");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [answer, setAnswer] = useState("");

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const response = await API.sendComponents(selectedComponents);
      console.log(response, "response");
      setAnalysis(response.analysis);
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
    // todo: refactorizar esto
    if (key === "memory_ram") {
      const ram = selectedComponents[key_component as ComponentKeys];
      if (!ram) {
        setSelectedComponents({
          ...selectedComponents,
          [components_keys[key_component]]: { ...component, quantity: 1 },
        });
        return;
      }
      const quantity = ram.quantity ?? 0;
      if (quantity >= 4) handleNextStep();
      setSelectedComponents({
        ...selectedComponents,
        [components_keys[key_component]]: {
          ...ram,
          quantity: quantity + 1,
        },
      });
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
            className="border-t border-r border-[#B94CED] pt-2"
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
                onClick={() => setOpenModal(!openModal)}
                className="bg-[#B94CED] truncate md:w-full mx-2 hover:bg-[#b065d2]"
              >
                Analizar compatibilidad de mis componentes
              </Button>
            </div>
          </form>
        </div>

        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <section className="px-6">
            <div className="text-white m-auto mt-5 pt-5 pr-4 max-w-4xl">
              {answer ? (
                <div className="flex flex-col items-start gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
                  <p className="text-sm text-white mb-4">{answer}</p>
                  <div className="flex  flex-wrap gap-4">
                    {analysis &&
                      analysis.map((analysis) => (
                        <article
                          key={analysis.type}
                          className="flex items-center gap-4 p-2 bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-green-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L3 12h5v8h8v-8h5L12 2z" />
                            </svg>
                            <p className="text-sm font-semibold text-white">
                              {analysis.text}:
                            </p>
                            <div className="flex items-center gap-2">
                              <div
                                className={`px-3 py-1 rounded-lg text-sm font-bold bg-opacity-10 bg-${analysis.condition ? "green" : "red"}-600`}
                              >
                                {analysis.value}
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-1/2 h-[10px]" />
                  <Skeleton className="w-10/12 h-[10px]" />
                  <Skeleton className="w-full h-[10px]" />
                </div>
              )}
            </div>
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
          </section>
        </Modal>

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

        <ComponentsList
          currentStep={currentStep}
          currentComponent={currentComponent}
          onAddComponent={handleAddComponent}
        />
      </section>
    </TooltipProvider>
  );
}
