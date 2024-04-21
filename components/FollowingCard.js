


import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemove } from "react-icons/io5";

const FollowingCard = () => {
  return (
    <>
      <div className="p-2 border shadow-md rounded-md">
        <div className="font-semibold">Following:</div>
        <div className="">
          <div className="p-2">
            <div className="p-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="http://res.cloudinary.com/dae2rh8dc/image/upload/v1713625938/socialApp/q7omkglygpv2b1mnytet.jpg"
                alt="profile image"
                className="w-10 h-10 rounded-full"
              />
              <div className="font-medium">Mike Tyson</div>
              </div>
              <IoPersonRemove className="w-5 h-5 hover:text-pink-500" />
            </div>
            <div className="border-t w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingCard;
