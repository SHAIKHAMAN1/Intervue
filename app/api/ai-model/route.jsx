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
        { error: "Missing one or more required fields" },
        { status: 400 }
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

    console.log("FINAL PROMPT:", FINAL_PROMPT);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${FINAL_PROMPT} [/INST]`,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("HF ERROR:", data);
      return NextResponse.json(
        { error: "HuggingFace API Error" },
        { status: 500 }
      );
    }

    // HF returns array format
    const generatedText = data[0]?.generated_text;

    return NextResponse.json({ content: generatedText });

  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}
