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
        const {postID,comment}=await req.json();
        const payload={
            description:comment,
            userID:user._id
        }
        const commentPost=await UserPostModel.updateOne({_id:postID},{
            $push:{comments:payload}
        });
        const commentList = await UserPostModel.find({ _id : postID}).populate({
            path : 'comments',
            populate : {
                path : 'userID'
            }
        })
        return NextResponse.json({message:"Comment Added",commentList},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Comment Error:",error},{status:500});
    }
}