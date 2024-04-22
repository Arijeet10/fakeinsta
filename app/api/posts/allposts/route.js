import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();



export async function GET(){
    try {
        const posts=await UserPostModel.find().populate("userID").sort({createdAt:-1});
        if(!posts){
            return NextResponse.json({message:"No posts available"},{status:404});
        }
        return NextResponse.json({message:"Posts Fetched",posts},{status:201});
    } catch (error) {
        return NextResponse.json({message:"AllPost Error:",error},{status:500});
    }
}

