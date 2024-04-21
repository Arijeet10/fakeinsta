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

    const { personID } = await req.json();
    console.log(personID);

    //unfollow person
    if (user?.following.includes(personID)) {
      const removeFollowing = await SocialUserModel.updateOne(
        { _id: user._id },
        {
          $pull: { following: personID },
        }
      );
      //remove the followers data from the unfollowed person followers field
      const removeFollowers = await SocialUserModel.updateOne(
        { _id: personID },
        {
          $pull: { followers: user._id },
        }
      );
      console.log("Unfollow", removeFollowing, removeFollowers);
      return NextResponse.json({ message: "Unfollowed" }, { status: 201 });
    }

    //follow person
    const addFollowing = await SocialUserModel.updateOne(
      { _id: user._id },
      {
        $push: { following: personID },
      }
    );
    //add the followers data to the followed person followers field
    const addFollowers = await SocialUserModel.updateOne(
      { _id: personID },
      { $push: { followers: user._id } }
    );
    console.log("FOllow", addFollowing, addFollowers);
    return NextResponse.json({ message: "Followed" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Follow Unfollow Error:", error },
      { status: 500 }
    );
  }
}
