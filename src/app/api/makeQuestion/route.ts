import { generateAnswer } from "@/lib/ai";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, analysis, apiKey } = await req.json();
  if (!prompt || !analysis || !apiKey) {
    return NextResponse.json(
      { status: "error", error: "Invalid prompt format" },
      { status: 400 },
    );
  }
  try {
    const text = await generateAnswer(prompt, analysis, apiKey);
    return NextResponse.json({
      status: "success",
      result: text,
    });
  } catch (error) {
    console.error("Failed to generate text: ", error);
    return NextResponse.json({ status: "error", error: error });
  }
}
