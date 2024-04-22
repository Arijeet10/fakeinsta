"use client";

import { useRouter } from "next/navigation";


const CommentsCard = ({ comment }) => {
  const router=useRouter();
  //console.log(comment)  
  
  return (
    <>
      <div className="p-2 border shadow-sm">
        <div onClick={()=>router.push(`/profile/${comment.userID?._id}`)} className="flex items-center gap-2 cursor-pointer">
          <img 
            src={comment.userID?.profilePic}
            alt="profile image"
            className="w-10 h-10 rounded-full object-contain border"
          />
          <div>{comment.userID?.fullname}</div>
        </div>
        <div className="pl-8 p-2">{comment.description}</div>
      </div>
    </>
  );
};

export default CommentsCard;
