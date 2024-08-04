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

export const extractPercentages = (text: string) => {
  const split = text.split(/\s+/);
  let compatibility;
  let cuelloDeBotella;
  for (let i = 0; i < split.length; i++) {
    const textLower = split[i].toLowerCase();
    if (textLower === "compatibilidad:") {
      compatibility = split[i + 1];
    }
    if (textLower === "botella:") {
      cuelloDeBotella = split[i + 1];
    }
  }
  return { compatibility, cuelloDeBotella };
};
