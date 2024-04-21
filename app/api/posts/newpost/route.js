import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import uploadImage from "@/helpers/uploadImage";
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
        const formData=await req.formData();
        const caption=formData.get("caption");
        const photo=formData.get("photo");
        const user=await getDetailsFromToken(req);
        // console.log(photo.name);
        if(!user){
            return NextResponse.json({message:"Can't post, please Login first"},{status:404});
        }
        let uploadedPhoto=""
        if(photo?.name){
            uploadedPhoto=await uploadImage(photo);
        }else{
            return NextResponse.json({message:"Invalid Photo"},{status:404});
        }
        //console.log(uploadedPhoto)
        const newPost=new UserPostModel({
            userID:user._id,
            caption,
            photo:uploadedPhoto.url,
        });
        //console.log(newPost)
        const savedPost=await newPost.save();
        return NextResponse.json({message:"Post Shared",savedPost},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Post Error:",error},{status:500})
    }
}


