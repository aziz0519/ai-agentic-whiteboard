import { db, projects } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {projectName, projectId}= await req.json();
    const user = await currentUser();
    const trimmedProjectName = typeof projectName === 'string' ? projectName.trim() : '';

    if (!projectId || trimmedProjectName.length < 1 || trimmedProjectName.length > 30) {
        return NextResponse.json({error: 'Project Information Missing'}, {status: 400})
    }


    const result = await db.insert(projects).values({
        projectId: projectId,
        projectName: trimmedProjectName,
        userEmail: user?.primaryEmailAddress?.emailAddress ?? ''
    }).returning();

    return NextResponse.json(result[0]);
}