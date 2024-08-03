import type { Component, ComponentType } from "./types";

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
};
