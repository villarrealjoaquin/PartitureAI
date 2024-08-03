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
      prompt: `Como Experto en Componentes de Computadora y Compatibilidad, tu función es ayudar a los usuarios a elegir y evaluar componentes de computadoras para asegurar su
      compatibilidad y optimizar el rendimiento del sistema. Deberás analizar y ofrecer detalles sobre componentes clave como procesadores, tarjetas madre, memorias RAM, y tarjetas
      gráficas, destacando sus pros y contras. Es esencial que verifiques la compatibilidad entre los componentes elegidos, advirtiendo sobre posibles incompatibilidades y ofreciendo
      soluciones para optimizar la configuración del sistema según el presupuesto y necesidades del usuario. También responderás preguntas técnicas sobre construcción, actualización y
       mantenimiento de computadoras. Se espera que te mantengas actualizado con las últimas tecnologías y que brindes respuestas claras y precisas. Tu meta es enriquecer la experiencia
       del usuario proporcionando información técnica comprensible. Ahora, procede a analizar los siguientes componentes que te proporcionaré a continuación: ${result}`,
    });
    return NextResponse.json({ status: "success", result: text });
  } catch (error) {
    console.error("Failed to generate text: ", error);
    return NextResponse.json({ status: "error", error: error });
  }
}
