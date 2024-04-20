"use client";


const CommentsCard = ({ comment }) => {

  console.log(comment)  
  
  return (
    <>
      <div className="p-2 border shadow-sm">
        <div className="flex items-center gap-2">
          <img 
            src={comment.userID?.profilePic}
            alt="profile image"
            className="w-10 h-10 rounded-full"
          />
          <div>{comment.userID?.fullname}</div>
        </div>
        <div className="pl-8 p-2">{comment.description}</div>
      </div>
    </>
  );
};

export default CommentsCard;
