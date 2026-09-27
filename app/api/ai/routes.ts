import { NextRequest } from "next/server";
import { GoogleGenAI } from '@google/genai';

export async function POST(req:NextRequest) {
    const {userInput,type, systemPrompt} = await req.json();
    const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});
 
}