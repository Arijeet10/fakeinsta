import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function DELETE(req){
    try {

        // user must be logged in before deleting their post
        const user=await getDetailsFromToken(req);
        if(!user){
            return NextResponse.json({message:"Login Before Deleting Posts!"},{status:404});
        }
        // console.log(user._id);


        //get post id
        const {postID}=await req.json();
        // console.log("Post ID-------",postID)

        // check if post is in the database or not
        const post=await UserPostModel.findOne({_id:postID})
        // console.log("Post",post)
        if(!post){
            return NextResponse.json({message:"Post not found in database"},{status:404});
        }

        //only delete post of the user who is logged in 
        if(post.userID!==user._id){
            return NextResponse.json({message:"Cannot Delete Post of others"},{status:404});
        }

        const deletedPost=await UserPostModel.findByIdAndDelete({_id:postID});
        return NextResponse.json({message:"Post Deleted",deletedPost},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Delete Post Error:",error},{status:500});
    }
}