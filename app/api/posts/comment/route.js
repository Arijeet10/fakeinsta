import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

connectMongoDB();


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