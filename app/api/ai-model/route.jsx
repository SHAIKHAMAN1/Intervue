import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";

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

    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command-r",
        message: FINAL_PROMPT,
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cohere Error:", data);
      return NextResponse.json(
        { error: data.message || "Cohere API error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: data.text,
    });

  } catch (error) {
    console.error("Server Crash:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}