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

export const ComponentsPC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );
  const [selectedValue, setSelectedValue] = useState<ComponentKeys>("cpu");
  const [openModal, setOpenModal] = useState<boolean>(false);
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
    setHasApiKey(true);
    setIsLoading(true);
    try {
      const response = await API.sendComponents(selectedComponents, apiKey);
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

  const handleAddComponent = (key: ComponentKeys, component: Component) => {
    const key_component = key;
    setSelectedComponents({
      ...selectedComponents,
      [components_keys[key_component]]: component,
    });
    handleNextStep();
  };

  const fetchAndAnalyzeComponents = async () => {
    try {
      setIsLoading(true);
      const response = await API.sendComponents(selectedComponents, apiKey);
      setAnalysis(response.analysis);
      setAnswer(response.result);
    } catch (error) {
      setError("Error fetching analysis data.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = async () => {
    setOpenModal(!openModal);
    if (apiKey && !openModal) {
      fetchAndAnalyzeComponents();
    }
  };

  const handleResetState = () => {
    setAnswer("");
    setOpenModal(!openModal);
    setSelectedComponents({} as ComponentType);
    setCurrentStep(0);
    setAnalysis([]);
  };

  const handleSelectChange = (value: ComponentKeys) => {
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
          onOpenModal={toggleModal}
        />
      </div>

      <Modal isOpen={openModal} onClose={handleResetState}>
        <section className="px-6 w-full">
          <ApiKeyVerify
            hasApiKey={hasApiKey}
            onApiKeyChange={setApiKey}
            onSubmit={handleSubmitComponents}
          />

          <ComponentsAnalysis
            analysis={analysis}
            answer={answer}
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
          onOpenModal={toggleModal}
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
