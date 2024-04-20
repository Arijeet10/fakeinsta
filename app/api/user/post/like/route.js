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
