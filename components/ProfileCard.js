"use client";

import { getUserPosts } from "@/helpers/request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileCard = ({ userData }) => {

  const router=useRouter();
  const [profilePosts,setProfilePosts]=useState();
  const [error,setError]=useState(false);

    //get profile posts
    useEffect(() => {
      if (userData) {
        (async function fetchPosts() {
          try {
            const res = await getUserPosts(userData._id);
            //console.log(res);
            if (res) {
              // toast.success(res.message);
              setProfilePosts(res.profilePosts);
            }
          } catch (error) {
            //console.log(error);
            setError(true);
          }
        })();
      }
    }, [userData]);

  return (
    <>
      <div className="flex flex-col items-center p-4 border shadow-md">
        <div onClick={()=>router.push(`/profile/${userData?._id}`)} className="rounded-full p-1 cursor-pointer bg-gradient-to-r from-pink-500 to-violet-500">
          <img
            src={userData?.profilePic}
            alt="user photo"
            className="w-20 h-20 rounded-full border-2 object-cover"
          />
        </div>
        <div>{userData?.username}</div>
        <div className="py-4 flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
          {/* to handle error while getting posts data */}
            {error?<div>-</div>:<div>{profilePosts?.length}</div>}
            <div className="text-lg font-semibold">Posts</div>
          </div>
          <div className="flex flex-col items-center">
            <div>{userData?.followers?.length}</div>
            <div className="text-lg font-semibold">Followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div>{userData?.following?.length}</div>
            <div className="text-lg font-semibold">Following</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
