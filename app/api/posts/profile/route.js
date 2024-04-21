import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function POST(req){
    try {
        const {profileID}=await req.json();
        const profilePosts=await UserPostModel.find({userID:profileID});
        //console.log(profilePosts);
        return NextResponse.json({message:"Profile Posts Fetched",profilePosts},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Profile Posts Fetch Error:",error},{status:500});
    }
}