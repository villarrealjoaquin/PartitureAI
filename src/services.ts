import type { ComponentType } from "./types";

export const API = {
  sendComponents: async (components: ComponentType) => {
    const response = await fetch("/api/components-pc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: components }),
    });
    if (!response.ok) throw new Error("Failed to send components");
    return response.json();
  },
  makeQuestions: async (text: string) => {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: text }),
    });
    if (!response.ok) throw new Error("Failed to send components");
    return response.json();
  },
};
