import { NextRequest } from "next/server";
import { GoogleGenAI, Type } from '@google/genai';

export async function POST(req:NextRequest) {
    const { userInput, type, systemPrompt } = await req.json();
    const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

    const finalPrompt = `${systemPrompt} User Request:${userInput}
    CANVAS GENERATION RULES:
    Create a professional ${type}
    Coordinate systems start from x=0 and y=0.
    Every element must contain:
    - unique id 
    - type
    - x 
    - y

    Add width and height wherever applicable.
    User appropriate:
    - backgroundColor
    - strokeColor
    - strokeWidth
    - fillstyle
    - roughness
    - opacity
    - font settings
    Use hex colors.
    Avoid overlapping elements.
    Keep sufficient spacing between elements.
    Connections must reference valid element IDs.
    Do not include markdown.
    `

    const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userInput,
        config: {
            responseMimeType:'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING
                    },
                    width: {
                        type: Type.NUMBER
                    },
                    height: {
                        type: Type.NUMBER
                    }
                }
            }
        },
    });

    const diagramResult =JSON.parse( response.text || '{}');

    return Response.json({
        success: true,
        diagramResult
    })
}