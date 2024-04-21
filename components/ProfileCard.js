"use client";

import { useRouter } from "next/navigation";

const ProfileCard = ({ userData }) => {

  const router=useRouter();

  return (
    <>
      <div className="flex flex-col items-center p-4 border shadow-md">
        <div onClick={()=>router.push(`/profile/${userData?._id}`)} className="rounded-full p-1 cursor-pointer bg-gradient-to-r from-pink-500 to-violet-500">
          <img
            src={userData?.profilePic}
            alt="user photo"
            className="w-20 h-20 rounded-full border-2"
          />
        </div>
        <div>{userData?.username}</div>
        <div className="py-4 flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <div>0</div>
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
