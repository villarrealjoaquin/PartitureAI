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
import { ApiKeyVerify } from "./ApiKeyVerify";
import { ComponentsList } from "./ComponenstList";
import { ComponentPicker } from "./ComponentPicker";
import { ComponentsAnalysis } from "./ComponentsAnalysis";
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
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitComponents = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setHasApiKey(true);
      setIsLoading(true);
      const response = await API.sendComponents(selectedComponents, apiKey);
      console.log(response, "response");
      if (response.status === "error") {
        throw new Error(
          "Hubo un problema al enviar los datos. Por favor, verifica tu API KEY o intenta nuevamente más tarde.",
        );
      }
      setAnalysis(response.analysis);
      setAnswer(response.result);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error: ${error.message}.`);
      }
    } finally {
      setIsLoading(false);
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

  const handleOpenModal = async () => {
    setOpenModal(!openModal);
    if (apiKey && !openModal) {
      const response = await API.sendComponents(selectedComponents, apiKey);
      setAnalysis(response.analysis);
      setAnswer(response.result);
    }
  };

  const handleCloseModal = () => {
    setAnswer("");
    setOpenModal(!openModal);
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    const index = Object.keys(COMPONENTS).indexOf(value);
    navigateToComponent(index);
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
          <ApiKeyVerify
            hasApiKey={hasApiKey}
            onApiKeyChange={setApiKey}
            onSubmit={handleSubmitComponents}
          />

          <ComponentsAnalysis
            analysis={analysis}
            answer={answer}
            hasApiKey={hasApiKey}
            error={error}
            isLoading={isLoading}
          />
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
