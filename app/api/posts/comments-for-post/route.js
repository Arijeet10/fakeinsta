import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
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


export async function POST(req){
    try {
        const user=await getDetailsFromToken(req);
        if(!user){
            return NextResponse.json({message:"Please Login first"},{status:404});
        }
        const {postID}=await req.json();
        //console.log(postID)
        const commentList = await UserPostModel.findOne({ _id : postID }).populate({
            path : 'comments',
            populate : {
                path : 'userID'
            }
        })
        //console.log("Comments:",commentList);
        return NextResponse.json({message:"Comments",commentList,success:true})
    } catch (error) {
        return NextResponse.json({message:"Comment for Post Error:",error},{status:500});
    }
}