import { db, projects, users } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { defaultBarStackProps } from "recharts/types/cartesian/BarStack";

export async function POST(req: NextRequest) {
    const {projectName, projectId}= await req.json();
    const user = await currentUser();
    const trimmedProjectName = typeof projectName === 'string' ? projectName.trim() : '';

    if (!projectId || trimmedProjectName.length < 1 || trimmedProjectName.length > 30) {
        return NextResponse.json({error: 'Project Information Missing'}, {status: 400})
    }

    // User credits
    const userCredits = await db.select().from(users).where(eq(users.email,user?.primaryEmailAddress?.emailAddress));
    if(userCredits[0].credits && userCredits[0].credits <= 0) {
        return NextResponse.json({error: "Insufficient Credits"});
    }


    const result = await db.insert(projects).values({
        projectId: projectId,
        projectName: trimmedProjectName,
        userEmail: user?.primaryEmailAddress?.emailAddress ?? ''
    }).returning();

    const updateUserCredits = await db.update(users).set({
        credits:Number(userCredits[0].credits) - 1
    }).where(eq(users.email,user?.primaryEmailAddress?.emailAddress));

    return NextResponse.json(result[0]);
}