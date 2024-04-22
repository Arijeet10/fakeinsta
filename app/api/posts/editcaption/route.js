import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function PATCH(req){
    try {

        //check if user is logged in before editing the caption of posts
        const user=await getDetailsFromToken(req);
        if(!user){
            return NextResponse.json({message:"Login Before Editing Post Caption"},{status:404});
        }

        //get post id and edited caption
        const {postID,caption}=await req.json();

        //check if post is in the database or not
        const post=await UserPostModel.findOne({_id:postID});
        if(!post){
            return NextResponse.json({message:"Can't find the post"},{status:404});
        }

        //edit post caption
        const editedPost=await UserPostModel.findByIdAndUpdate(
            {_id:postID},
            {caption},
            {new:true},
        );

        //console.log(editedPost);
        return NextResponse.json({message:"Edited Caption",editedPost},{status:201});


    } catch (error) {
        return NextResponse.json({message:"Edit Caption Error:",error},{status:500});
    }
}