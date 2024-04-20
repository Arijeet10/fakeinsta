const ProfileCard = ({ userData }) => {
  return (
    <>
      <div className="flex flex-col items-center p-4 border shadow-md">
        <div className="rounded-full p-1 bg-gradient-to-r from-pink-500 to-violet-500">
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
            <div>Posts</div>
          </div>
          <div className="flex flex-col items-center">
            <div>100</div>
            <div>Followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div>200</div>
            <div>Following</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
