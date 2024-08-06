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
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [answer, setAnswer] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [hasApiKey, setHasApiKey] = useState(false);

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setHasApiKey(true);
      const response = await API.sendComponents(selectedComponents, apiKey);
      setAnalysis(response.analysis);
      setAnswer(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToComponent = (step: number) => {
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    const condition = currentStep >= STEPS.length - 1;
    if (condition) return;
    setCurrentStep(currentStep + 1);
  };

  const handleOpenModal = async () => {
    setOpenModal(!openModal);
    if (apiKey && !openModal) {
      const response = await API.sendComponents(selectedComponents, apiKey);
      setAnalysis(response.analysis);
      setAnswer(response.result);
      setStatus(response.status);
    }
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
        <section className="px-6 w-full">
          {!hasApiKey && (
            <form
              onSubmit={handleSubmitComponents}
              className="flex flex-col gap-5 justify-center items-center w-full py-8"
            >
              <h2 className="text-center text-4xl font-bold text-white">
                Ingresar API KEY 🤖
              </h2>
              <p className="text-center text-white my-2 border border-[#B94CED] rounded-lg p-4">
                Bienvenido al portal de acceso de nuestra Inteligencia
                Artificial{" "}
                <span className="text-[#B94CED] font-bold">TeianAI</span>. Para
                comenzar a interactuar con nuestras herramientas avanzadas, es
                necesario que ingreses tu{" "}
                <span className="text-[#B94CED] font-bold">API KEY</span>
                personal. Este código único te permitirá realizar operaciones y
                acceder a funcionalidades exclusivas. Por favor, introduce tu
                <span className="text-[#B94CED] font-bold"> API KEY</span> en el
                campo de abajo y presiona{" "}
                <span className="text-[#B94CED] font-bold">Ingresar</span> para
                continuar.
              </p>
              <div className="w-full">
                <Input
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Ingresa tu API KEY"
                  name="apiKey"
                  className="bg-transparent border-[#B94CED] w-full text-white"
                />
              </div>
              <Button className="w-36 bg-[#B94CED] hover:bg-[#b065d2] transition-all ease-in-out duration-300 flex self-end active:scale-95">
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
                    <Skeleton className="w-7/12 h-[8px]" />
                    <Skeleton className="w-6/12 h-[8px]" />
                    <Skeleton className="w-5/12 h-[8px]" />
                    <Skeleton className="w-9/12 h-[8px]" />
                    <Skeleton className="w-3/12 h-[8px]" />
                    <Skeleton className="w-full h-[8px]" />
                  </div>
                )}
              </div>
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
