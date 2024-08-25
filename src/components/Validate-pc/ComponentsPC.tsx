"use client";

import { API } from "@/services";
import type { Analysis, ComponentType } from "@/types";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { ApiKeyVerify } from "../build-pc/ApiKeyVerify";
import { ComponentsAnalysis } from "../build-pc/ComponentsAnalysis";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ComponentSummary } from "./ComponentSummary";
import {
  CasesIcon,
  CoolerIcon,
  CpuIcon,
  GraphicVideoIcon,
  MemoryRamIcon,
  MotherboardIcon,
  PowerSupplyIcon,
  StorageDrivesIcon,
} from "../Icons";
import { SummaryResponsive } from "./SummaryResponsive";

const inputs = [
  {
    id: 1,
    name: "cpu",
    placeHolder: "Ingresa tu cpu",
    image: <CpuIcon color="white" />,
  },
  {
    id: 2,
    name: "motherboard",
    placeHolder: "Ingresa tu motherboard",
    image: <MotherboardIcon color="white" />,
  },
  {
    id: 3,
    name: "cooler",
    placeHolder: "Ingresa tu cooler",
    image: <CoolerIcon color="white" />,
  },
  {
    id: 4,
    name: "ram",
    placeHolder: "Ingresa tu/tus rams",
    image: <MemoryRamIcon color="white" />,
  },
  {
    id: 5,
    name: "placa de video",
    placeHolder: "Ingresa tu placa de video",
    image: <GraphicVideoIcon color="white" />,
  },
  {
    id: 6,
    name: "ssd/hdd",
    placeHolder: "Ingresa tu sdd y/o hdd",
    image: <StorageDrivesIcon color="white" />,
  },
  {
    id: 7,
    name: "fuente",
    placeHolder: "Ingresa tu fuente",
    image: <PowerSupplyIcon color="white" />,
  },
  {
    id: 8,
    name: "gabinete",
    placeHolder: "Ingresa tu gabinete",
    image: <CasesIcon color="white" />,
  },
];

export const ComponentsPC = () => {
  const [selectedComponents, setSelectedComponents] = useState<ComponentType>(
    {} as ComponentType,
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [answer, setAnswer] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [savedComponents, setSavedComponents] = useState<
    Array<{ name: string; value: string }>
  >([]);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveComponents = () => {
    const componentsArray = inputs
      .filter((input) => formValues[input.name]) // Filtra solo los componentes que tienen valores
      .map((input) => ({
        name: input.name,
        value: formValues[input.name],
        image: input.image,
      }));
    setSavedComponents(componentsArray);
  };

  const handleResetState = () => {
    setAnswer("");
    setOpenModal(!openModal);
    setAnalysis([]);
  };

  return (
    <>
      <div className="hidden w-1/2 lg:w-[700px] lg:flex lg:flex-col border-r border-[#B94CED]">
        <span className="text-white font-bold m-4">Tus componentes</span>
        <ComponentSummary
          components={savedComponents}
          setOpenModal={setOpenModal}
        />
      </div>

      <Modal isOpen={openModal} onClose={handleResetState}>
        <section className="px-6 w-full">
          <ApiKeyVerify
            hasApiKey={hasApiKey}
            onApiKeyChange={setApiKey}
            onSubmit={handleSubmitComponents}
          />
        </section>
      </Modal>

      <div className="flex flex-col w-full mt-5 p-4 lg:hidden">
        <SummaryResponsive
          savedComponents={savedComponents}
          onOpenModal={toggleModal}
        />
      </div>

      <form className="flex flex-col w-full">
        {inputs.map((input: any) => (
          <div className="m-3">
            <span className="text-white">{input.name}</span>
            <Input
              className="bg-transparent border-[#B94CED] w-full mt-2 text-white"
              placeholder={input.placeHolder}
              name={input.name}
              value={formValues[input.name] || ""}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={handleSaveComponents}
          className="self-center sm:self-end p-4 bg-[#B94CED] capitalize w-[200px] text-xl m-4 hover:bg-[#b065d2]"
        >
          guardar
        </Button>
      </form>
    </>
  );
};
