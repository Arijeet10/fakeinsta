import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

connectMongoDB();


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