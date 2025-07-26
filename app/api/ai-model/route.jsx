import { QUESTIONS_PROMPT } from '@/services/Constants';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    if (
      !jobPosition ||
      !jobDescription ||
      !duration ||
      !type ||
      (Array.isArray(type) && type.length === 0)
    ) {
      return NextResponse.json(
        { error: 'Missing one or more required fields' },
        { status: 400 }
      );
    }

    const formattedType = Array.isArray(type) ? type.join(', ') : type;

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace('{{jobTitle}}', jobPosition)
      .replace('{{jobDescription}}', jobDescription)
      .replace('{{duration}}', duration)
      .replace('{{type}}', formattedType);

    console.log('FINAL PROMPT:', FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: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,
    });

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free', // ✅ Ensure this is valid per OpenRouter
      messages: [
        {
          role: 'user',
          content: FINAL_PROMPT,
        },
      ],
    });

    console.log('Completion:', completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error('API Error:', e);
    return NextResponse.json(
      { error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
}
