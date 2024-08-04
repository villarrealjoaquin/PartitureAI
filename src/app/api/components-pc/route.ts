import { ENVS } from "@/envs";
import { Messages } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse, type NextRequest } from "next/server";

const perplexity = createOpenAI({
  apiKey: ENVS.OPENAI_API_KEY ?? "",
  baseURL: "https://api.perplexity.ai/",
});

const model = perplexity("llama-3-sonar-large-32k-online");

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const messages: Messages = prompt;
  let result = ``;
  Object.entries(messages).forEach(([key, value]) => {
    result += `${key}: ${value.name}`;
  });
  try {
    const { text } = await generateText({
      model,
      prompt: `Como Experto en Componentes de Computadora y Compatibilidad, tu función es ayudar a los usuarios. Deberás brindar una respuesta clara y precisa en texto plano, 
      sin caracteres especiales como asteriscos, guiones, o almohadillas, debe ser un texto plano y no dividido en items. Limita tu respuesta a un máximo de 200 palabras. Comienza indicando la compatibilidad general en porcentaje, 
      sigue con un análisis de cada componente y finaliza con el porcentaje de cuello de botella: ${result}`,
    });
    return NextResponse.json({ status: "success", result: text });
  } catch (error) {
    console.error("Failed to generate text: ", error);
    return NextResponse.json({ status: "error", error: error });
  }
}
