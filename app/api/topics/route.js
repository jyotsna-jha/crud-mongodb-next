
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";
export async function POST(request){
    const {title, description}=await request.json();
    await connectMongodb();
    await Topic.create({title,description});
    return NextResponse.json({message:"Topic Created"},{status:201})

}

