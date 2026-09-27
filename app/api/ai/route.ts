import { NextRequest } from "next/server";
import { GoogleGenAI } from '@google/genai';

export async function POST(req:NextRequest) {
    const { userInput, systemPrompt } = await req.json();
    const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

    const generatedResult = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userInput,
        config: { systemInstruction: systemPrompt },
    });

    return Response.json({ result: generatedResult.text });
}