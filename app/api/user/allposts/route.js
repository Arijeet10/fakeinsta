import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

//exporting OPTIONS async function in routes handler 
export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }

export async function GET(){
    try {
        const posts=await UserPostModel.find();
        if(!posts){
            return NextResponse.json({message:"No posts available"},{status:404});
        }
        return NextResponse.json({message:"Posts Fetched",posts},{status:201});
    } catch (error) {
        return NextResponse.json({message:"AllPost Error:",error},{status:500});
    }
}

