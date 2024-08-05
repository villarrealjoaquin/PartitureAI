"use client";

import { COMPONENTS, components_keys, STEPS } from "@/constants";
import { API } from "@/services";
import type {
  Analysis,
  Component,
  ComponentKeys,
  ComponentType,
  ComponentValues,
} from "@/types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { ComponentsList } from "./ComponenstList";
import { ComponentPicker } from "./ComponentPicker";
import { ComponentSummary } from "./ComponentSummary";
import { SelectStepComponent } from "./SelectStepComponent";
import { SummaryResponsive } from "./SummaryResponsive";

export const Components = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );
  const [selectedValue, setSelectedValue] = useState("cpu");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [answer, setAnswer] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<string>("error");
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setHasApiKey(true);
      const response = await API.sendComponents(selectedComponents, apiKey);
      console.log(response, "response");
      setAnalysis(response.analysis);
      setAnswer(response.result);
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const navigateToComponent = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    const condition = currentStep >= STEPS.length - 1;
    if (condition) return;
    setCurrentStep(currentStep + 1);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
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
    navigateToComponent(index);
  };

  const handleCloseModal = () => {
    setAnswer("");
    setOpenModal(!openModal);
  };

  const currentComponent = STEPS[currentStep] as ComponentValues;

  return (
    <>
      <div className="hidden w-1/2 lg:w-[700px] lg:flex lg:flex-col">
        <ComponentPicker
          currentComponent={currentComponent}
          onNavigateToComponent={navigateToComponent}
        />
        <ComponentSummary
          selectedComponents={selectedComponents}
          onOpenModal={handleOpenModal}
        />
      </div>

      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <section className="px-6">
          {!hasApiKey && (
            <form
              onSubmit={handleSubmitComponents}
              className="flex flex-col gap-5 h-[40vh] justify-center items-center"
            >
              <h2 className="text-4xl font-bold text-white">
                Ingresar API KEY
              </h2>
              <div>
                <Input
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Ingresa tu API KEY"
                  name="apiKey"
                />
              </div>
              <Button className="bg-[#B94CED] hover:bg-[#b065d2]">
                Ingresar
              </Button>
            </form>
          )}

          {hasApiKey && (
            <>
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
            </>
          )}
        </section>
      </Modal>

      <div className="flex flex-col w-full mt-5 p-4 lg:hidden">
        <SelectStepComponent
          selectedValue={selectedValue}
          onSelectChange={handleSelectChange}
        />
        <SummaryResponsive
          selectedComponents={selectedComponents}
          onOpenModal={handleOpenModal}
        />
      </div>

      <ComponentsList
        currentStep={currentStep}
        currentComponent={currentComponent}
        onAddComponent={handleAddComponent}
      />
    </>
  );
};
