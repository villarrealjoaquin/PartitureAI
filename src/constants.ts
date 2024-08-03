import {
  CasesIcon,
  CoolerIcon,
  CpuIcon,
  GraphicVideoIcon,
  MemoryRamIcon,
  MotherboardIcon,
  PowerSupplyIcon,
  StorageDrivesIcon,
} from "@/components/Icons";
import type { ComponentValues } from "./types";

export const COMPONENTS = {
  cpu: CpuIcon,
  gpu: GraphicVideoIcon,
  power_supplies: PowerSupplyIcon,
  memory_ram: MemoryRamIcon,
  motherboards: MotherboardIcon,
  storage_drives: StorageDrivesIcon,
  cooler: CoolerIcon,
  cases: CasesIcon,
};

export const componentNames = {
  cpu: "CPU (Central Processing Unit)",
  gpu: "GPU (Graphics Processing Unit)",
  power_supplies: "Power Supply",
  memory_ram: "RAM (Random Access Memory)",
  motherboards: "Motherboard",
  storage_drives: "Storage Drives",
  cooler: "Cooler",
  cases: "Cases",
};

export const components_keys: Record<string, ComponentValues> = {
  cpu: "cpu",
  gpu: "gpu",
  power_supplies: "power_supplies",
  memory_ram: "memory_ram",
  motherboard: "motherboards",
  storage_drives: "storage_drives",
  cooler: "cooler",
  cases: "cases",
};

export const STEPS = [
  "cpu",
  "gpu",
  "power_supplies",
  "memory_ram",
  "motherboards",
  "storage_drives",
  "cooler",
  "cases",
];

export const cardsContent = [
  {
    id: 1,
    title: "Construcción enteramente personalizada",
    descripcion:
      "Vos podés armar tu propia PC con los componentes que más te gusten, brindándote una experiencia absolutamente individual.",
  },
  {
    id: 2,
    title: "Descripciones claves",
    descripcion:
      "Te brindamos una descripción clara y precisa de la funcionalidad del componente.",
  },
  {
    id: 3,
    title: "Análisis por IA",
    descripcion:
      "Te ofrecemos un análisis interactivo realizado mediante IA para que tengas un mejor panorama de la compatibilidad de tus componentes.",
  },
  {
    id: 4,
    title: "Construcción enteramente personalizada",
    descripcion:
      "Vos podés armar tu propia PC con los componentes que más te gusten, brindándote una experiencia absolutamente individual.",
  },
];
