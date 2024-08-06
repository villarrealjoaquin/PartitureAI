import { generateOutput } from "@/lib/ai";
import { extractData, formatPrompt } from "@/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, apiKey } = await req.json();
  if (!prompt || typeof prompt !== "object" || !apiKey) {
    return NextResponse.json(
      { status: "error", error: "Invalid prompt format" },
      { status: 400 },
    );
  }
  const result = formatPrompt(prompt);
  try {
    const { text } = await generateOutput(result, apiKey);
    const analysis = extractData(text);
    return NextResponse.json({
      status: "success",
      result: text,
      analysis,
    });
  } catch (error) {
    console.error("Failed to generate text: ", error);
    return NextResponse.json({ status: "error", error: error });
  }
}
