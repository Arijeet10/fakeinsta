import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import SocialUserModel from "@/libs/models/UserModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

connectMongoDB();

export async function POST(req) {
  try {
    const user = await getDetailsFromToken(req);
    //console.log(user._id);
    if (!user) {
      return NextResponse.json(
        { message: "Login first before follow unfollow" },
        { status: 404 }
      );
    }

    const {personID} = await req.json();
    console.log(personID);

    //unfollow person
    if (user?.followers.includes(personID)) {
      const removeFriend = await SocialUserModel.updateOne(
        { _id: user._id },
        {
          $pull: { followers: personID },
        }
      );
      console.log("Unfollow",removeFriend)
      return NextResponse.json({ message: "Unfollowed" }, { status: 201 });
    }

    //follow person
    const addFriend = await SocialUserModel.updateOne(
      { _id: user._id },
      {
        $push: { followers: personID },
      }
    );
    console.log("FOllow",addFriend)
    return NextResponse.json({ message: "Followed" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Follow Unfollow Error:", error },
      { status: 500 }
    );
  }
}
