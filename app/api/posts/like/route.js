import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

connectMongoDB();



export async function POST(req) {
  try {
    const user = await getDetailsFromToken(req);
    //console.log(user.id);
    const { postID } = await req.json();
    //console.log(postID)
    const post = await UserPostModel.findOne({ _id: postID });
    //console.log(post)
    if (post.likes.includes(user.id)) {
      //console.log("Removing Like");
      const updatePost = await UserPostModel.updateOne(
        { _id: postID },
        {
          $pull: { likes: user._id },
        }
      );
      const postData = await UserPostModel.findOne({ _id: postID });
      return NextResponse.json(
        {
          message: "Like",
          data: postData.like,
          success: true,
        },
        { status: 201 }
      );
    }
    //console.log("Adding like");
    const updatePost = await UserPostModel.updateOne(
      { _id: postID },
      {
        $push: { likes: user._id },
      }
    );
    const postData = await UserPostModel.findOne({ _id: postID });
    //console.log(postData);
    return NextResponse.json(
      {
        message: "Liked",
        data: postData.like,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Like Error:", error },
      { status: 500 }
    );
  }
}
