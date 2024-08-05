import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const generateOutput = async (data: string, apiKey: string) => {
  const perplexity = createOpenAI({
    apiKey,
    baseURL: "https://api.perplexity.ai/",
  });

  const model = perplexity("llama-3-sonar-large-32k-online");

  return generateText({
    model,
    prompt: `
      Como Experto en Componentes de Computadora y Compatibilidad, tu función es ayudar a los usuarios. 
      Deberás brindar una respuesta clara y precisa en texto plano, sin caracteres especiales como asteriscos, guiones, o almohadillas, debe ser un texto plano y no dividido en ítems. 
      Limita tu respuesta a un máximo de 200 palabras.
      
      Antes dame un resumen sobre los componentes.

      Informa los siguientes detalles:
      1. Compatibilidad general en porcentaje.
      2. Cuello de botella en porcentaje.
      3. Consumo de energía estimado en vatios.
      4. Temperatura estimada de la CPU bajo carga.
      5. Ruido estimado en dB.
      6. Puntuación de rendimiento general.
      7. Compatibilidad con futuras actualizaciones.
      
      Finaliza con un resumen donde los datos estén en este formato:

      compatibilidad: X%
      cuello de botella: Y%
      consumo de energía: Z watts
      temperatura cpu: A°C
      ruido estimado: B dB
      puntuación rendimiento: C/10
      compatibilidad futuras actualizaciones: Alta/Media/Baja

      componentes: ${data}
      `,
  });
};

export const generateAnswer = async (
  prompt: string,
  analysis: string,
  apiKey: string,
) => {
  const perplexity = createOpenAI({
    apiKey,
    baseURL: "https://api.perplexity.ai/",
  });
  const model = perplexity("llama-3-sonar-large-32k-online");
  const { text } = await generateText({
    model,
    prompt: `
      Has recibido una serie de componentes de computadora que han sido previamente analizados. Estos componentes incluyen detalles sobre su compatibilidad, rendimiento, consumo de energía, temperatura y otros factores relevantes.
  
      También has recibido una pregunta de un usuario que está buscando más información o tiene una duda específica sobre estos componentes.
  
      Tu tarea es:
      1. Revisar el análisis previo de los componentes que has recibido.
      2. Responder de manera clara y precisa a la pregunta del usuario basada en el análisis de los componentes.
      
      Aquí está el análisis previo de los componentes:
      ${analysis}
  
      Y aquí está la pregunta del usuario:
      ${prompt}
  
      Por favor, proporciona una respuesta detallada a la pregunta del usuario basada en el análisis previo de los componentes, asegurándote de ser claro y específico en tu respuesta.

      Tambien generame preguntas sobre los componentes para que las pueda usar, las preguntas tienen que tener el siguiente formato:

      1- pregunta
      2- pregunta
      3- pregunta
    `,
  });
  return text;
};
