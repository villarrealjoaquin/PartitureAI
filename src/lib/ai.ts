import { ENVS } from "@/envs";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const perplexity = createOpenAI({
  apiKey: ENVS.OPENAI_API_KEY ?? "",
  baseURL: "https://api.perplexity.ai/",
});

const model = perplexity("llama-3-sonar-large-32k-online");

export const generateOutput = async (data: string) => {
  return generateText({
    model,
    prompt: `
    Como Experto en Componentes de Computadora y Compatibilidad, tu función es ayudar a los usuarios. 
    Deberás brindar una respuesta clara y precisa en texto plano, sin caracteres especiales como asteriscos, guiones, o almohadillas, debe ser un texto plano y no dividido en items. 
    Limita tu respuesta a un máximo de 200 palabras.
    Comienza indicando la compatibilidad general en porcentaje, sigue con un análisis de cada componente y finaliza con el porcentaje de cuello de botella: ${data}
    
    Quiero que los porcentajes esten al final de esta manera:
    
    compatibilidad: 1 al 100
    cuello de botella: 1 al 100
    `,
  });
};
