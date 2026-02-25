import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import Cohere from "cohere-ai";

const cohere = new Cohere({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } =
      await req.json();

    if (
      !jobPosition ||
      !jobDescription ||
      !duration ||
      !type ||
      (Array.isArray(type) && type.length === 0)
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.COHERE_API_KEY) {
      return NextResponse.json(
        { error: "Cohere API key missing" },
        { status: 500 }
      );
    }

    const formattedType = Array.isArray(type)
      ? type.join(", ")
      : type;

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", formattedType);

    const response = await cohere.chat({
      model: "command-r", // Best free model
      message: FINAL_PROMPT,
      temperature: 0.7,
      max_tokens: 600,
    });

    if (!response?.text) {
      return NextResponse.json(
        { error: "No response from Cohere" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: response.text.trim(),
    });

  } catch (error) {
    console.error("Cohere Error:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}