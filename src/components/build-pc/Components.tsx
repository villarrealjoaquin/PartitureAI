"use client";

import { ComponentType, useState } from "react";

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

  return <></>;
};
