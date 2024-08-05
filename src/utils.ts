import type { Messages } from "./types";

export const checkAllComponentsExist = (components: any) => {
  const fields = [
    "cpu",
    "motherboards",
    "cooler",
    "cases",
    "gpu",
    "power_supplies",
    "memory_ram",
    "storage_drives",
  ];
  return fields.every((field) => components[field]);
};

export const formatPrompt = (prompt: Messages) => {
  let result = "";
  Object.entries(prompt).forEach(([key, value]) => {
    result += `${key}: ${value.name}`;
  });
  return result;
};

export const extractData = (text: string) => {
  const data = {
    compatibility: text.match(/compatibilidad:\s(\d+)%/)?.[1] ?? "",
    bottleneck: text.match(/cuello de botella:\s(\d+)%/)?.[1] ?? "",
    powerConsumption:
      text.match(/consumo de energía:\s(\d+)\s?watts?/)?.[1] ?? "",
    cpuTemperature: text.match(/temperatura cpu:\s(\d+)°C/)?.[1] ?? "",
    noiseLevel: text.match(/ruido estimado:\s(\d+)\sdB/)?.[1] ?? "",
    performanceScore:
      text.match(/puntuación rendimiento:\s(\d+)\/10/)?.[1] ?? "",
    upgradeCompatibility:
      text.match(
        /compatibilidad futuras actualizaciones:\s(Alta|Media|Baja)/i,
      )?.[1] ?? "",
  };
  const componentsData = [
    {
      type: "compability",
      text: "Compatibilidad",
      value: `${data.compatibility}%`,
      condition: Number(data.compatibility) >= 70,
    },
    {
      type: "bottleneck",
      text: "Cuello de botella",
      value: `${data.bottleneck}%`,
      condition: Number(data.bottleneck) <= 20,
    },
    {
      type: "powerConsumption",
      text: "Consumo de energía",
      value: `${data.powerConsumption}wD`,
      condition: true,
    },
    {
      type: "cpuTemperature",
      text: "Temperatura CPU",
      value: `${data.cpuTemperature}°C`,
      condition: true,
    },
    {
      type: "noiseLevel",
      text: "Ruido",
      value: `${data.noiseLevel}dB`,
      condition: true,
    },
    {
      type: "performanceScore",
      text: "Puntuación de rendimiento",
      value: data.performanceScore,
      condition: true,
    },
    {
      type: "upgradeCompatibility",
      text: "Compatibilidad con futuras actualizaciones",
      value: data.upgradeCompatibility,
      condition: true,
    },
  ];
  return componentsData;
};

export const percentageColor = (
  percentage: number,
): "green" | "yellow" | "red" => {
  if (percentage <= 30) return "red";
  if (percentage <= 70) return "yellow";
  return "green";
};
