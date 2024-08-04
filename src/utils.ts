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
