import { generateOutput } from "@/lib/ai";
import { extractPercentages, formatPrompt } from "@/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== "object") {
    return NextResponse.json(
      { status: "error", error: "Invalid prompt format" },
      { status: 400 },
    );
  }
  const result = formatPrompt(prompt);
  try {
    const { text } = await generateOutput(result);
    const percentages = extractPercentages(text);
    return NextResponse.json({
      status: "success",
      result: text,
      percentages,
    });
  } catch (error) {
    console.error("Failed to generate text: ", error);
    return NextResponse.json({ status: "error", error: error });
  }
}
