import { db, whiteboardData } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { profileEnd } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {projectId,elements,appState,files} = await req.json();
    const user = await currentUser();

    if (!user)
    {
        return NextResponse.json('Unauthorized User')
    }

    if (projectId)
    {
        const result = await db.insert(whiteboardData).values({
            projectId: projectId,
            elements: elements,
            appState: appState,
            files: files
        }).onConflictDoUpdate({
            target:whiteboardData.projectId,
            set:{
                 elements: elements,
                 appState: appState,
                files: files
            }
        })

        return NextResponse.json(result);
    }

    return NextResponse.json('Project Information Missing')
}